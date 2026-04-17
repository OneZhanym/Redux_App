import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchInstruments, fetchInstrumentById, openForm, closeForm, deleteInstrument, toggleLike, toggleFavorite, addRating, clearSelectedInstrument } from './instrumentsSlice';
import InstrumentForm from './InstrumentForm';
import './instruments.css';

const InstrumentsList = () => {
    const dispatch = useDispatch();
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
    const { items, selectedInstrument, loading, showForm, editingId } = useSelector(state => state.instruments);

    useEffect(() => {
        dispatch(fetchInstruments());
    }, [dispatch]);

    const handleSelectInstrument = (id) => {
        dispatch(fetchInstrumentById(id));
    };

    const handleBackToList = () => {
        dispatch(clearSelectedInstrument());
    };

    const getAverageRating = (ratings) => {
        if (!ratings || ratings.length === 0) return 0;
        const sum = ratings.reduce((acc, curr) => acc + curr, 0);
        return (sum / ratings.length).toFixed(1);
    };

    const displayedItems = showOnlyFavorites ? items.filter(item => item.isFavorite) : items;

    if (loading) {
        return <div className="instruments-container">Загрузка данных...</div>;
    }

    // Режим DETAIL - показываем выбранный инструмент
    if (selectedInstrument) {
        return (
            <div className="instruments-container">
                <button className="btn-back" onClick={handleBackToList}>← Вернуться к списку</button>
                <div className="instrument-detail">
                    <div className="detail-image">
                        <img src={selectedInstrument.image} alt={selectedInstrument.name} />
                    </div>
                    <div className="detail-content">
                        <h1>{selectedInstrument.name}</h1>
                        <p className="instrument-type">Тип: <strong>{selectedInstrument.type}</strong></p>
                        <div className="rating-display">
                            ⭐ Средняя оценка: {getAverageRating(selectedInstrument.ratings)} ({selectedInstrument.ratings?.length || 0} отзывов)
                        </div>
                        <p className="instrument-description">{selectedInstrument.description}</p>
                        <div className="instrument-price">
                            <span className="price-label">Цена:</span>
                            <span className="price-value">${selectedInstrument.price}</span>
                        </div>
                        <div className="interaction-bar">
                            <button className={`btn-fav ${selectedInstrument.isFavorite ? 'active' : ''}`} onClick={() => dispatch(toggleFavorite(selectedInstrument.id))}>
                                {selectedInstrument.isFavorite ? '❤️ В избранном' : '🤍 В избранное'}
                            </button>
                            <button className="btn-like-big" onClick={() => dispatch(toggleLike(selectedInstrument.id))}>
                                👍 Лайк ({selectedInstrument.likes || 0})
                            </button>
                        </div>
                        <div className="rating-input">
                            <span>Оцените:</span>
                            {[1, 2, 3, 4, 5].map(num => (
                                <button key={num} onClick={() => dispatch(addRating({ id: selectedInstrument.id, rating: num }))}>
                                    {num}
                                </button>
                            ))}
                        </div>
                        <div className="detail-actions">
                            <button className="btn-edit" onClick={() => dispatch(openForm(selectedInstrument.id))}>Редактировать</button>
                            <button className="btn-delete" onClick={() => dispatch(deleteInstrument(selectedInstrument.id))}>Удалить</button>
                        </div>
                        <button className="btn-buy">Купить</button>
                    </div>
                </div>
                {showForm && <InstrumentForm />}
            </div>
        );
    }

    // Режим LIST - показываем список инструментов
    return (
        <div className="instruments-container">
            <div className="list-header">
                <h2>{showOnlyFavorites ? '❤️ Избранные инструменты' : 'Каталог музыкальных инструментов'}</h2>
                <button className="btn-filter-fav" onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}>
                    {showOnlyFavorites ? 'Показать все' : 'Показать избранное'}
                </button>
            </div>
            
            <div className="instruments-grid">
                {displayedItems.map(instrument => (
                    <div key={instrument.id} className="instrument-card">
                        <div className="card-image">
                            <img src={instrument.image} alt={instrument.name} />
                            <div className="card-badges">
                                <button 
                                    className={`badge-fav ${instrument.isFavorite ? 'active' : ''}`}
                                    onClick={(e) => { e.stopPropagation(); dispatch(toggleFavorite(instrument.id)); }}
                                >
                                    {instrument.isFavorite ? '❤️' : '🤍'}
                                </button>
                            </div>
                        </div>
                        <div className="card-content">
                            <h3>{instrument.name}</h3>
                            <p className="card-type">{instrument.type}</p>
                            <p className="card-description">{instrument.description.substring(0, 80)}...</p>
                            <div className="card-footer">
                                <span className="card-price">${instrument.price}</span>
                                <button 
                                    className="btn-details"
                                    onClick={() => handleSelectInstrument(instrument.id)}
                                >
                                    Подробнее
                                </button>
                                <div className="card-rating-mini">
                                    ⭐ {getAverageRating(instrument.ratings)}
                                </div>
                                <button className="btn-like-mini" onClick={() => dispatch(toggleLike(instrument.id))}>👍 {instrument.likes || 0}</button>
                                <div className="card-actions">
                                    <button className="btn-edit-card" onClick={() => dispatch(openForm(instrument.id))}>✏️</button>
                                    <button className="btn-delete-card" onClick={() => dispatch(deleteInstrument(instrument.id))}>🗑️</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
                <button className="btn-add-new" onClick={() => dispatch(openForm())}>
                    Добавить инструмент
                </button>
            </div>
            {showForm && <InstrumentForm />}
        </div>
    );
};

export default InstrumentsList;
