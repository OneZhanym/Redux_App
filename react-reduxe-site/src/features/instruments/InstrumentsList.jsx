import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchInstruments, fetchInstrumentById } from './instrumentsSlice';
import './instruments.css';

const InstrumentsList = () => {
    const dispatch = useDispatch();
    const { items, selectedInstrument, loading } = useSelector(state => state.instruments);

    useEffect(() => {
        dispatch(fetchInstruments());
    }, [dispatch]);

    const handleSelectInstrument = (id) => {
        dispatch(fetchInstrumentById(id));
    };

    const handleBackToList = () => {
        dispatch({ type: 'instruments/clearSelectedInstrument' });
    };

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
                        <p className="instrument-description">{selectedInstrument.description}</p>
                        <div className="instrument-price">
                            <span className="price-label">Цена:</span>
                            <span className="price-value">${selectedInstrument.price}</span>
                        </div>
                        <button className="btn-buy">Купить</button>
                    </div>
                </div>
            </div>
        );
    }

    // Режим LIST - показываем список инструментов
    return (
        <div className="instruments-container">
            <h2>Каталог музыкальных инструментов</h2>
            <div className="instruments-grid">
                {items.map(instrument => (
                    <div key={instrument.id} className="instrument-card">
                        <div className="card-image">
                            <img src={instrument.image} alt={instrument.name} />
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
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InstrumentsList;
