import Footer from "../features/common/Footer"
import Navbar from "../features/navbar/Navbar"
import ProductDetails from "../features/product/components/ProductDetails"

const ProductDetailPage = () => {
  return (
   <div>
     <Navbar>
        <ProductDetails></ProductDetails>
     </Navbar>
     <Footer></Footer>
     </div>
  )
}

export default ProductDetailPage