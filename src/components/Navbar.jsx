import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { dispatch, store } = useGlobalReducer(); 
	const favorites = store.favorites || [];

	const handleRemoveFavorite = (name, type) => {
		dispatch({
			type: "REMOVE_FAVORITE",
			payload: { name, type }
		});
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<img
						src="https://1000logos.net/wp-content/uploads/2017/06/Star-Wars-Logo-1.png"
						alt="Star Wars"
						className="navbar-brand"
						style={{ height: '40px' }}
					/>
				</Link>

				<div className="dropdown ml-auto">
					<button
						className="btn btn-warning dropdown-toggle"
						type="button"
						id="favoritesDropdown"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						Favorites ({favorites.length})
					</button>
					<ul
						className="dropdown-menu dropdown-menu-end"
						aria-labelledby="favoritesDropdown"
					>
						{favorites.length === 0 ? (
							<li>
								<span className="dropdown-item">No favorites yet</span>
							</li>
						) : (
							favorites.map((fav, i) => (
								<li key={i}>
									<div className="dropdown-item d-flex justify-content-between align-items-center">
										<span>
											{fav.name} {fav.type ? `(${fav.type})` : ""}
										</span>
										<button
											onClick={() => handleRemoveFavorite(fav.name, fav.type)}
											className="btn btn-sm btn-outline-danger ms-2"
										>
											X
										</button>
									</div>
								</li>
							))
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};