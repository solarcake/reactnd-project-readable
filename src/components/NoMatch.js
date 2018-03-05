import React, {Component} from 'react';
import ContentHome from 'material-ui/svg-icons/action/home';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import {Link} from 'react-router-dom'

const NoMatch = () => (
    <div>
        <h1>Cannot find what you are looking for</h1>
        <h2>click here to go to the main page, some nice stuff there <Link href="#" to="/"><FloatingActionButton mini={true}><ContentHome /></FloatingActionButton></Link></h2>
    </div>
)

export default NoMatch;