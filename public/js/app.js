const form = document.querySelector('form');
const loc = document.querySelector('input');
const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(loc.value);

  p1.innerHTML = 'Loading';
  p1.innerHTML = '';
  fetch(`http://localhost:3000/weather?address=${loc.value}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        p1.innerHTML = data.error;
        // console.log(data.error);
      } else {
        p1.innerHTML = data.location;
        p2.innerHTML = data.forecast.weather[0].description;
        console.log(data.forecast);
        p2.innerHTML = `${data.forecast.weather[0].description}.It is currently ${data.forecast.temp} degrees out.`;
      }
    });
  });
});
