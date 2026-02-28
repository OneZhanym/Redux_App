import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createInstrument, updateInstrument, closeForm } from './instrumentsSlice';
import './instruments.css';

const InstrumentForm = () => {
    const dispatch = useDispatch();
    const { editingId, selectedInstrument, loading } = useSelector(state => state.instruments);
    console.log('InstrumentForm рендерится - editingId:', editingId, 'loading:', loading);
    
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        description: '',
        price: '',
        image: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        console.log('InstrumentForm: useEffect - editingId:', editingId, 'selectedInstrument:', selectedInstrument);
        if (editingId && selectedInstrument) {
            console.log('Загружаем данные инструмента для редактирования');
            setFormData(selectedInstrument);
        } else {
            console.log('Очищаем форму');
            setFormData({
                name: '',
                type: '',
                description: '',
                price: '',
                image: ''
            });
        }
    }, [editingId, selectedInstrument]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Название обязательно';
        if (!formData.type.trim()) newErrors.type = 'Тип обязателен';
        if (!formData.description.trim()) newErrors.description = 'Описание обязательно';
        if (!formData.price || formData.price <= 0) newErrors.price = 'Цена должна быть больше 0';
        if (!formData.image.trim()) newErrors.image = 'Изображение обязательно';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? value : value
        }));
        // Очистить ошибку при редактировании
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('📤 InstrumentForm: handleSubmit вызван');
        const newErrors = validateForm();
        
        if (Object.keys(newErrors).length > 0) {
            console.log('⚠️ Ошибки валидации:', newErrors);
            setErrors(newErrors);
            return;
        }

        const instrumentData = {
            ...formData,
            price: Number(formData.price)
        };

        if (editingId) {
            console.log('✏️ Обновление:', { id: Number(editingId), data: instrumentData });
            dispatch(updateInstrument({ id: Number(editingId), data: instrumentData }));
        } else {
            console.log('➕ Создание:', instrumentData);
            dispatch(createInstrument(instrumentData));
        }
    };

    const handleClose = () => {
        dispatch(closeForm());
    };

    return (
        <div className="form-overlay">
            <div className="form-container">
                <div className="form-header">
                    <h2>{editingId ? 'Редактировать инструмент' : 'Добавить новый инструмент'}</h2>
                    <button className="btn-close" onClick={handleClose}>✕</button>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Название *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Введите название инструмента"
                            className={errors.name ? 'input-error' : ''}
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="type">Тип инструмента *</label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className={errors.type ? 'input-error' : ''}
                        >
                            <option value="">Выберите тип</option>
                            <option value="Струнный">Струнный</option>
                            <option value="Клавишный">Клавишный</option>
                            <option value="Ударный">Ударный</option>
                            <option value="Духовой">Духовой</option>
                            <option value="Электронный">Электронный</option>
                        </select>
                        {errors.type && <span className="error-message">{errors.type}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Описание *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Введите описание инструмента"
                            rows="4"
                            className={errors.description ? 'input-error' : ''}
                        />
                        {errors.description && <span className="error-message">{errors.description}</span>}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="price">Цена ($) *</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0"
                                min="0"
                                step="0.01"
                                className={errors.price ? 'input-error' : ''}
                            />
                            {errors.price && <span className="error-message">{errors.price}</span>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">URL изображения *</label>
                        <input
                            type="url"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            className={errors.image ? 'input-error' : ''}
                        />
                        {errors.image && <span className="error-message">{errors.image}</span>}
                    </div>

                    {formData.image && (
                        <div className="form-group">
                            <label>Предпросмотр изображения:</label>
                            <div className="image-preview">
                                <img src={formData.image} alt="Preview" />
                            </div>
                        </div>
                    )}

                    <div className="form-actions">
                        <button 
                            type="button" 
                            className="btn-cancel" 
                            onClick={handleClose}
                        >
                            Отмена
                        </button>
                        <button 
                            type="submit" 
                            className="btn-submit"
                            disabled={loading}
                        >
                            {loading ? 'Сохранение...' : (editingId ? 'Обновить' : 'Добавить')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InstrumentForm;
