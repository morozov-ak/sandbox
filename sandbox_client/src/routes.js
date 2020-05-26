import React from 'react'
import { Switch, Route,Redirect } from 'react-router-dom'
import { NotesPage } from './pages/NotesPage'
import { AuthPage } from './pages/AuthPage'
import { CreateNote } from './pages/CreateNote'

export const useRoutes = isAuthenticated =>{
    if (isAuthenticated){
        return(
            <Switch>
                <Route path="/Notes" exact>
                    <NotesPage/>
                </Route>
                <Route path="/Create" exact>
                    <CreateNote/>
                </Route>
                <Redirect to="/Create"/>
            </Switch>
        )
    }
    return(
        <Switch>
            <Route path="/">
                <AuthPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}