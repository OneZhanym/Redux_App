let instruments = [
    {
        id: 1,
        name: 'Гитара',
        type: 'Струнный',
        description: 'Популярный струнный музыкальный инструмент с богатым звуком. Идеален для жанра рок, поп и классики.',
        price: 300,
        image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&h=400&fit=crop'
    },
    {
        id: 2,
        name: 'Фортепиано',
        type: 'Клавишный',
        description: "Величественный клавишный инструмент. Используется в классической музыке, джазе и современных стилях.",
        price: 1200,
        image: 'https://pianomag.ru/files/8013/9670/6534/whp_bp_p126.jpg'
    },
    {
        id: 3,
        name: 'Скрипка',
        type: 'Струнный',
        description: 'Благородный инструмент с чарующим звуком. Основа классической музыки и оркестров.',
        price: 500,
        image: 'https://www.belcanto.ru/media/images/term/14092012.jpg'
    },
    {
        id: 4,
        name: 'Барабан',
        type: 'Ударный',
        description: 'Мощный ударный инструмент. Формирует ритм и темп в любом музыкальном произведении.',
        price: 400,
        image: 'https://www.musicca.com/files/scripts/drums/static/media/drum-kit-standard.eb6cdcf0e2d2b6c360fb.png'
    },
    {
        id: 5,
        name: 'Флейта',
        type: 'Духовой',
        description: 'Возвышенный деревянный инструмент. Создает нежные и лиричные мелодии.',
        price: 150,
        image: 'https://ir.ozone.ru/s3/multimedia-s/6741487216.jpg'
    },
    {
        id: 6,
        name: 'Саксофон',
        type: 'Духовой',
        description: 'Медный инструмент с глубоким, чувственным звуком. Король джаза.',
        price: 800,
        image: 'https://dshi-ob.nsk.muzkult.ru/media/2018/08/19/1230890296/image_image_1031729.jpg'
    },
    {
        id: 7,
        name: 'Виолончель',
        type: 'Струнный',
        description: 'Глубокий струнный инструмент. Придает камерной музыке теплоту и выразительность.',
        price: 700,
        image: 'https://музыкалка-онлайн.рф/storage/userFiles/1/5/0.28336700%201644276610.jpeg'
    },
    {
        id: 8,
        name: 'Синтезатор',
        type: 'Электронный',
        description: 'Современный электронный инструмент. Позволяет создавать любые звуки и эффекты.',
        price: 1000,
        image: 'https://sound.kg/wp-content/uploads/2022/10/MODX-6-Hero-324x217.jpg'
    },
    {
        id: 9,
        name: 'Укулеле',
        type: 'Струнный',
        description: 'Миниатюрный гавайский инструмент. Создает веселый и позитивный звук.',
        price: 120,
        image: 'https://bangbang.kz/images/detailed/20/ukulele-soprano-veston-kus-15bk-500x600-7964.jpg'
    },
    {
        id: 10,
        name: 'Контрабас',
        type: 'Струнный',
        description: 'Самый крупный струнный инструмент. Обеспечивает баса в оркестральных композициях.',
        price: 900,
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/AGK_bass1_full.jpg'
    }
];

//Имитация задержки
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

//Получить инструменты
export const fetchInstrumentalApi = async ()=> {
    await delay(500);
    return instruments;
}

//Получить инструменты по id
export const fetchInstrumentalByIdApi = async(id) =>{
    await delay(300);
    return instruments.find(inst=>inst.id=== Number(id));
}

// Создать инструмент
export const createInstrumentalApi = async (data) => {
    await delay(300);
    const newId = instruments.length ? Math.max(...instruments.map(i => i.id)) + 1 : 1;
    const newInstrument = { ...data, id: newId };
    instruments = [...instruments, newInstrument];
    return newInstrument;
};

// Обновить инструмент
export const updateInstrumentalApi = async (id, data) => {
    await delay(300);
    instruments = instruments.map(inst => inst.id === Number(id) ? { ...inst, ...data, id: Number(id) } : inst);
    return instruments.find(inst => inst.id === Number(id));
};

// Удалить инструмент
export const deleteInstrumentalApi = async (id) => {
    await delay(300);
    const deleted = instruments.find(inst => inst.id === Number(id));
    instruments = instruments.filter(inst => inst.id !== Number(id));
    return deleted;
};