const list = document.querySelectorAll('.list__item');
const title = document.querySelectorAll('.card__title');
const duration = document.querySelectorAll('.card__text');
const prevDuration = document.querySelectorAll('.card__text--sm');
const cards = document.querySelectorAll('.card');
let defaultTime = 'weekly';



const timeData = async function (sort) {
    const res = await fetch('data.json');
    if(!res.ok) throw new Error('Data not found!');

    const data = await res.json();

    let prefix;

    if (sort === 'daily') {
        prefix = 'yesterday';
    }

    if (sort === 'weekly') {
        prefix = 'Last week';
    }

    if (sort === 'monthly') {
        prefix = 'Last month';
    }

    for(let i = 0; i < cards.length; i++) {
        title[i].textContent = data[i]['title'];
        duration[i].textContent = `${data[i]['timeframes'][sort]['current']}hrs`;
        prevDuration[i].textContent = `${prefix} - ${data[i]['timeframes'][sort]['previous']}hrs`;
    }
}
timeData(defaultTime)

// (async function() {
//     try {
//         const data = await timeData(defaultTime);
//         console.log(data);
//     } catch(err) {
//         console.error(err.message);
//     }
//     console.log('finish');
// })();


list.forEach(item => {
    if(item.textContent.toLowerCase() === defaultTime) {
        item.classList.add('active');
    }
    item.addEventListener('click', (e) => {
        list.forEach(item => item.classList.remove('active'));
        e.target.classList.add('active');
        timeData(e.target.textContent.toLowerCase());
    })
})


