import React from 'react';

import {BrowserRouter, Route} from 'react-router-dom';
import landing from './pages/landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';
 function Routes(){
   return(
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Route path="/" exact component={landing} />
        <Route path="/app" component={OrphanagesMap} />
        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />
        
      </BrowserRouter>

   );
 } 

 export default Routes;