import { useNavigate } from 'react-router-dom';

export function PizzaCreatePage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.elements.name.value,
      isGlutenFree: e.target.elements.isGlutenFree.value,
      kepURL: e.target.elements.kepURL.value,
    };

    fetch("https://pizza.kando-dev.eu/Pizza", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(() => {
        navigate("/");
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='p-5 content bg-whitesmoke text-center'>
      <h2>Új pizza</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group row pb-3'>
          <label htmlFor="name" className='col-sm-3 col-form-label'> Név: </label>
          <div>
            <input type="text" id="name" name="name" className="form-control" autoComplete='name' />
          </div>
        </div>
        <div className='form-group row pb-3'>
          <label htmlFor="isGlutenFree" className='col-sm-3 col-form-label'> Gluténmentes-e: </label>
          <div>
            <input type="number" id="isGlutenFree" name="isGlutenFree" className="form-control" autoComplete='isGlutenFree' />
          </div>
        </div>
        <div className='form-group row pb-3'>
          <label htmlFor="kepURL" className='col-sm-3 col-form-label'> Kép URL: </label>
          <div>
            <input type="text" id="kepURL" name="kepURL" className="form-control" autoComplete='kepURL' />
          </div>
        </div>
        <button type="submit" className='btn btn-success'>Küldés</button>
      </form>
    </div>
  );
}