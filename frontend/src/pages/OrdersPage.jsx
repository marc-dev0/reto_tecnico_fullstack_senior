import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package,
    Plus,
    Search,
    LogOut,
    Trash2,
    Pencil,
    Clock,
    CheckCircle2,
    AlertCircle,
    X
} from 'lucide-react';

import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const orderSchema = z.object({
    numeroPedido: z.string().min(1, 'El número de pedido es obligatorio').max(50, 'Máximo 50 caracteres'),
    cliente: z.string().min(3, 'El nombre del cliente debe tener al menos 3 caracteres').max(150, 'Máximo 150 caracteres'),
    total: z.number({ invalid_type_error: 'El total debe ser un número' }).min(0.01, 'El total debe ser mayor a 0'),
});

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const { logout } = useAuth();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(orderSchema),
        defaultValues: { numeroPedido: '', cliente: '', total: 0 }
    });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await api.get('/api/pedidos');
            setOrders(response.data);
        } catch (err) {
            toast.error('Error al cargar pedidos');
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            if (currentOrder) {
                await api.put(`/api/pedidos/${currentOrder.id}`, {
                    ...data,
                    estado: currentOrder.estado
                });
                toast.success('Pedido actualizado con éxito');
            } else {
                await api.post('/api/pedidos', data);
                toast.success('Pedido creado con éxito');
            }
            closeModal();
            fetchOrders();
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Error al procesar la solicitud';
            toast.error(errorMessage);
        }

    };

    const handleDelete = async (id) => {
        toast.custom((t) => (
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex flex-col gap-4">
                <p className="font-semibold text-slate-800">¿Estás seguro de eliminar este pedido?</p>
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            confirmDelete(id);
                            toast.dismiss(t);
                        }}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-700"
                    >
                        Eliminar
                    </button>
                    <button
                        onClick={() => toast.dismiss(t)}
                        className="bg-slate-100 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-200"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        ));
    };

    const confirmDelete = async (id) => {
        try {
            await api.delete(`/api/pedidos/${id}`);
            toast.success('Pedido eliminado');
            fetchOrders();
        } catch (err) {
            toast.error('No se pudo eliminar el pedido');
        }
    };

    const openModal = (order = null) => {
        if (order) {
            setCurrentOrder(order);
            setValue('numeroPedido', order.numeroPedido);
            setValue('cliente', order.cliente);
            setValue('total', order.total);
        } else {
            setCurrentOrder(null);
            reset({ numeroPedido: '', cliente: '', total: 0 });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentOrder(null);
        reset();
    };

    const filteredOrders = orders.filter(o =>
        o.numeroPedido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.cliente.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <div className="bg-primary-600 p-2 rounded-lg text-white">
                        <Package size={24} />
                    </div>
                    <span className="font-bold text-xl text-slate-800">OrderSys</span>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary-50 text-primary-700 rounded-xl font-medium">
                        <Package size={20} /> Pedidos
                    </button>
                </nav>
                <div className="p-4 border-t border-slate-100">
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                        <LogOut size={20} /> Cerrar Sesión
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-8">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900">Gestión de Pedidos</h1>
                        <p className="text-slate-500 mt-1">Administra los pedidos de forma eficiente.</p>
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 shadow-lg shadow-primary-200 transition-all"
                    >
                        <Plus size={20} /> Nuevo Pedido
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="text-slate-500 text-sm font-medium mb-2">Total Pedidos</div>
                        <div className="text-3xl font-bold text-slate-900">{orders.length}</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-emerald-600">
                        <div className="text-slate-500 text-sm font-medium mb-2">Total Ingresos</div>
                        <div className="text-3xl font-bold">
                            ${orders.reduce((acc, curr) => acc + curr.total, 0).toLocaleString()}
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Buscar pedido..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nº Pedido</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Cliente</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Fecha</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <AnimatePresence mode="popLayout">
                                    {isLoading ? (
                                        <motion.tr
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <td colSpan="6" className="px-6 py-12 text-center text-slate-400">Cargando...</td>
                                        </motion.tr>
                                    ) : filteredOrders.map((order) => (
                                        <motion.tr
                                            key={order.id}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="hover:bg-slate-50/50 transition-colors group"
                                        >
                                            <td className="px-6 py-4">
                                                <span className="font-semibold text-slate-700">{order.numeroPedido}</span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">{order.cliente}</td>
                                            <td className="px-6 py-4 text-slate-500 text-sm">
                                                {new Date(order.fecha).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${order.estado === 'Registrado' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                                                    }`}>
                                                    {order.estado === 'Registrado' ? <Clock size={12} /> : <CheckCircle2 size={12} />}
                                                    {order.estado}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-slate-800">${order.total.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => openModal(order)}
                                                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                                    >
                                                        <Pencil size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(order.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                    {!isLoading && filteredOrders.length === 0 && (
                        <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-4">
                            <Package size={48} className="text-slate-200" />
                            <p>No se encontraron pedidos.</p>
                        </div>
                    )}
                </div>
            </main>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-slate-900">
                                    {currentOrder ? 'Editar Pedido' : 'Crear Nuevo Pedido'}
                                </h3>
                                <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                <div>
                                    <label className="text-sm font-semibold text-slate-700 block mb-1.5">Nº de Pedido</label>
                                    <input
                                        type="text"
                                        disabled={!!currentOrder}
                                        {...register('numeroPedido')}
                                        className={`w-full px-4 py-3 border rounded-xl outline-none transition-all focus:ring-2 disabled:bg-slate-50 disabled:text-slate-400 ${errors.numeroPedido ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-primary-500'}`}
                                        placeholder="Ej: PED-001"
                                    />
                                    {errors.numeroPedido && (
                                        <span className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                                            <AlertCircle size={12} /> {errors.numeroPedido.message}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-slate-700 block mb-1.5">Cliente</label>
                                    <input
                                        type="text"
                                        {...register('cliente')}
                                        className={`w-full px-4 py-3 border rounded-xl outline-none transition-all focus:ring-2 ${errors.cliente ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-primary-500'}`}
                                        placeholder="Nombre completo del cliente"
                                    />
                                    {errors.cliente && (
                                        <span className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                                            <AlertCircle size={12} /> {errors.cliente.message}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-slate-700 block mb-1.5">Total</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                        <input
                                            type="number"
                                            step="0.01"
                                            {...register('total', { valueAsNumber: true })}
                                            className={`w-full pl-8 pr-4 py-3 border rounded-xl outline-none transition-all focus:ring-2 ${errors.total ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-primary-500'}`}
                                        />
                                    </div>
                                    {errors.total && (
                                        <span className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                                            <AlertCircle size={12} /> {errors.total.message}
                                        </span>
                                    )}
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 px-4 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 px-4 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200 disabled:opacity-70"
                                    >
                                        {isSubmitting ? 'Procesando...' : (currentOrder ? 'Guardar Cambios' : 'Crear Pedido')}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

