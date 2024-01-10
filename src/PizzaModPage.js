import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function PizzaModPage() {
  const param = useParams();
  const navigate = useNavigate();
  const id = param.pizzaId;

  const [modname, setModname] = useState("");
const [isGlutenFree, setModisGlutenFree] = useState(null);
const [modkepurl, setModkepurl] = useState("");


  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`https://pizza.kando-dev.eu/Pizza/${id}`);
        
        const pizzaData = await res.json();
        setModname(pizzaData.name);
        setModisGlutenFree(pizzaData.isGlutenFree);
        setModkepurl(pizzaData.kepURL);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  const modName = (e) => {
    setModname(e.target.value);
  };

  const modisGlutenFree = (e) => {
    setModisGlutenFree(e.target.value);
  };

  const modkepUrl = (e) => {
    setModkepurl(e.target.value);
  };

  return (
    <div className='p-5 content bg-lavender text-center'>
      <h2>Pizza módosítás</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch(`https://pizza.kando-dev.eu/Pizza/${id}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: modname,
              isGlutenFree: isGlutenFree,
              kepURL: modkepurl,
            }),
          })
            .then(() => {
              navigate("/");
            })
            .catch(console.log);
        }}
      >
        <div className='form-group row pb-3'>
          <label htmlFor="name" className='col-sm-3 col-form-label'> Név: </label>
          <div>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              autoComplete='name'
              value={modname}
              onChange={modName}
            />
          </div>
        </div>
        <div className='form-group row pb-3'>
          <label htmlFor="isGlutenFree" className='col-sm-3 col-form-label'> Gluténmentes-e: </label>
          <div>
          <input
            type="number"
            id="isGlutenFree"  
            name="isGlutenFree"
            className="form-control"
            autoComplete='isGlutenFree'
            value={isGlutenFree === null ? '' : isGlutenFree}
            onChange={modisGlutenFree}
          />
          </div>
        </div>
        <div className='form-group row pb-3'>
          <label htmlFor="kepURL" className='col-sm-3 col-form-label'> Kép URL: </label>
          <div>
            <input
              type="text"
              id="kepURL"
              name="kepURL"
              className="form-control"
              autoComplete='kepURL'
              value={modkepurl}
              onChange={modkepUrl}
            />
          </div>
        </div>
        <button type="submit" className='btn btn-success'>Küldés</button>
      </form>
    </div>
  );
}