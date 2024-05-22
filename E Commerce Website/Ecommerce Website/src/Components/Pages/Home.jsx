import React from 'react'
import Navbar from '../Navbar/Navbar'
import ListOfProducts from '../Product-Lists/ListOfProducts'
import Pagination from '../Pagination/Pagination'
function Home() {
  return (
    <div>
        <Navbar/>
        <ListOfProducts/>
        <Pagination/>
    </div>
  )
}

export default Home



  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("http://localhost:4000/product/products");
  //     const data = await response.json();
  //     setProducts(data);
  //   };

  //   fetchData();
  // }, []);
