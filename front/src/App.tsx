import { useState } from 'react';
import DefaultLayout from './layout';
import classnames from 'classnames';
import { HashRouter, Routes, Route } from 'react-router-dom';

export function App() {
	const [bSidebar, setSider] = useState(true);
	const [bAside, setAside] = useState(true);
	const [bMiniSide, setMiniSide] = useState(false);
	console.log(
		`${process.env.REACT_APP_API_HOST}`,
		`${process.env.REACT_APP_API_HOST}`
	);
	return (
		<div
			className={
				classnames(
					'app',
					'header-fixed',
					'sidebar-fixed',
					'aside-menu-fixed',
					'pace-done',
					{ 'sidebar-lg-show': bSidebar }, //좌측메뉴 보이기
					{ 'aside-menu-lg-show': bAside }, //우측메뉴 보이기
					{ 'sidebar-minimized': bMiniSide }
				) //좌측 메뉴 최소화
			}
		>
			<HashRouter>
				<Routes>
					<Route path="/*" element={<DefaultLayout />} />
				</Routes>
			</HashRouter>
		</div>
	);
}

export default App;
