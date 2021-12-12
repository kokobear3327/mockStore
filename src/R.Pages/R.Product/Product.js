import React, { useState, useEffect } from 'react'
import './Product.css';
import Modal from "react-modal";
import axios from 'axios';
import ProductTile from '../../R.Components/R.ProductTile/ProductTile';
import { useParams } from 'react-router-dom';

Modal.setAppElement("#root"); 
const Product = () => {
    const { product } = useParams();
    const [ productName, setProductName ] = useState();
    const [ categories, setCategories ] = useState([]);

    useEffect(() => {
        console.log(`here comes product`)
        console.log(product)
        setProductName(product)

        axios.get(`https://api.c8ck9e9y0x-rsivideot1-d1-public.model-t.cc.commerce.ondemand.com/occ/v2/powertools-spa/products/search?fields=products(code%2Cname%2Csummary%2Cconfigurable%2CconfiguratorType%2Cprice(FULL)%2Cimages(DEFAULT)%2Cstock(FULL)%2CaverageRating%2CvariantOptions)%2Cfacets%2Cbreadcrumbs%2Cpagination(DEFAULT)%2Csorts(DEFAULT)%2CfreeTextSearch%2CcurrentQuery&query=%3Arelevance%3AallCategories%3A1355&currentPage=2&pageSize=12&lang=en&curr=USD`)
            .then(res => {
                console.log(res.data);
                console.log(`here come facets222`)
                console.log(res.data.facets)
                console.log(res.data.facets[0])
                console.log(res.data.facets[0].values)
                let indexer = -1;
                if (product === 'Category') { indexer = 0 }
                if (product === 'Brand') { indexer = 1 }
                if (product === 'Price') { indexer = 2 }
                if (product === 'All') { indexer = 3 }
                setCategories(res.data.facets[indexer].values)
                // const object = res.data.facets[indexer].values;
                // for (const property in object) {
                //     if (property === 'categories') {}
                // }
            })
        .catch(function (error) { console.log(error)})
    }, [])

    return (
        <div className='productParent'>
            <div className='productMainTitleContainer'>
                <div className='productTitle'>
                    {product}
                </div>
            </div>
            
            <div className='productTilesContainerParent'>
                <div className='productTilesContainer'>
                    { categories.map((category) => (
                        <div className='productTileComponentContainer'>
                            <ProductTile categoryName={category.name}></ProductTile>
                        </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Product;