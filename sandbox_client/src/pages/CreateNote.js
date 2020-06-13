import React from 'react'
export const CreateNote = () => {
    return(
        
    <div>
        <h1>Создать заметку</h1>
        <div className="input-group mb-3">
            <input type="text" placeholder="Заголовок заметки" className="form-control" aria-label="Amount (to the nearest dollar)"/>
            <div className="input-group-append">
                <button className="btn btn-success" type="button" id="button-addon2">Сохранить</button>
            </div>
        </div>


        <div className="input-group">
            
        <textarea className="form-control" aria-label="With textarea"></textarea>
        </div>
    </div>

        
    )
}