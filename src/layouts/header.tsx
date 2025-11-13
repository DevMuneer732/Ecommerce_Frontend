import { Link } from "react-router-dom";
export const Header = () => {
  return (
    <header className="flex justify-between max-w-7xl px-4 sm:px-6 lg:px-8 py-2 bg-black text-white">
      <div>
        <p className="text-sm">Welcome to Ecommerce!</p>
      </div>
      <div className="text-sm">
        <ul className="flex gap-5">
          <li>
            <Link to="#">Help</Link>
          </li>
          <li>
            <Link to="/my-orders">My Orders</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
