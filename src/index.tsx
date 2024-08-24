import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

// react router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// pages
import { Layout } from './pages/layout/Layout';
import { ErrorPage } from './pages/errorPage/ErrorPage';

// contexts
import { CacheProvider } from './context/cacheContext/CacheContext';

// pages
import { HomePage } from './pages/homePage/HomePage';
import { SinglePage } from './pages/singlePage/SinglePage';

// css
import './index.css';

const router = createBrowserRouter([
	{
		path: '/', 
		element: <Layout />, 
		errorElement: <ErrorPage />, 
		children: [
			{
				index: true, 
				path: '/', 
				element: <HomePage />, 
			}, 
			{
				path: '/:postId', 
				element: <SinglePage />, 
			}, 
		], 
	}
]);

const root = ReactDOM.createRoot(
document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<CacheProvider>
			<RouterProvider router={router}/>
		</CacheProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();