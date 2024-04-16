
import './JobdateTable.css';
import { ButtonC } from '../ButtonC/ButtonC';
export const JobdateTable = (
    {id,
        date,
        client_name,
        client_phone,
        client_email,
    }) => {

        const editHandler = () => {
            console.log("Editar")
        }

        const deleteHandler = () => {
            console.log("Eliminar")
        }
        
        return(
            <div key={id} className="row appointment" >
                <div key={id+1} className="row">
                    <div  className="col-md-12">
                        Fecha: {date}
                    </div>
                    <div key={id+2} className="col-md-6">
                        Cliente: {client_name}
                    </div>
                    <div key={id+3} className="col-md-6">
                        Telefono: {client_phone}
                    </div>
                    <div key={id+4} className="col-md-6">
                        email: {client_email}
                    </div>
                    
                </div>
                <div key={id+5} className="row">
                <div key={id+5} className="col-md-6">
                        <ButtonC
                            title={"Editar"}
                            className={"regularButtonClass"}
                            functionEmit={editHandler}
                        />
                    </div>
                    <div key={id+6} className="col-md-6">
                        <ButtonC
                            title={"Eliminar"}
                            className={"regularButtonClass"}
                            functionEmit={deleteHandler}
                        />
                    </div>
                </div>
            </div>)
};