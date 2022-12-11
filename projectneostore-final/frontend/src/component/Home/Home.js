import React, { useEffect } from 'react'
import ProductCard from "./ProductCard";
import MetaData from '../layout/MetaData';
import { getProduct } from '../../actions/productAction';
import {useSelector,useDispatch} from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from 'react-alert';
import {Carousel} from "react-bootstrap"

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading,error,products,productsCount}=useSelector(
        (state)=>state.products
    )
    useEffect(()=>{
        if(error){
            return alert.error(error);
        }
        dispatch(getProduct());
    },[dispatch,error,alert])
    return (
       <>
       {loading ? (<Loader />):(
           <>
           <MetaData title="Home page working"/>
           <Carousel fade style={{marginTop:"30px",height:"400px",width:"1350px"}}>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://f1af951e8abcbc4c70b9-9997fa854afcb64e87870c0f4e867f1d.lmsin.net/1000005772527-1000005772526_01-710.jpg"
                    alt="First slide"
                    style={{height:"350px",width:"1250px"}}
                    />
                    <Carousel.Caption>
                   
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://ii1.pepperfry.com/media/catalog/product/r/o/568x284/royal-corner-sectional-sofa-with--tufted-back-in-beige-colour-by-dreamzz-furniture-royal-corner-sect-oi021y.jpg"
                    alt="Second slide"
                    style={{height:"350px",width:"1250px"}}
                    />

                    <Carousel.Caption>
                    
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://ii1.pepperfry.com/media/catalog/product/a/m/568x284/amanda-corner-sofa-in-turquoise-colour-by-primrose-amanda-corner-sofa-in-turquoise-colour-by-primros-eciumb.jpg"
                    alt="Third slide"
                    style={{height:"350px",width:"1250px"}}
                    />

                    <Carousel.Caption>
                    
                    </Carousel.Caption>
                </Carousel.Item>
           </Carousel>
       <h2 className='homeHeading' style={{textAlign:"center"}}>Popular Products</h2>
       <p className='homeHeading1' style={{textAlign:"center"}}>View all</p>

       <div className='container' id='container' style={{display:"flex",flexWrap:"wrap"}}>
       {products && products.map(product=>(
                <ProductCard key={product._id} product={product} />
            ))}
       </div>
           </>
       )}
       </>
    )
}

export default Home
