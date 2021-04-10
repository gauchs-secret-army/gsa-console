import React, { useState } from 'react';
import styles from "./ProductListing.module.scss";
import {Sidenav} from "../../../common/navigation/component/Sidenav";
import { Redirect, useLocation } from 'react-router';
import Item from "../../../common/features/component/Item";
import { Plus } from 'react-feather';
import {TextField} from "../../../common/text_field/component/TextField";
import { render } from '@testing-library/react';
import ImageUploading from "react-images-uploading";
import classNames from 'classnames';


export function ProductListing() {
    const [loading, setLoading] = useState(false);
    const [productID, setProductID] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [img, setImage] = useState(""); //Update
	const [images, setImages] = useState([]); //for ImgHandler
    const [stock, setStock] = useState("");
    const [createdOn, setCreatedOn] = useState("");
	

	function registerProduct() {
		setLoading(true);
		if(validateEntries()) {
			var rawItem = JSON.stringify({
				"productID": 2, // Expect this to go away at some point
				"name": "Pills",
				"price": "20.50",
				"image": "1234",   // the stored encoded image string
				"stock": 1
			});
			
			fetch("https://gsa-backend-api.herokuapp.com/products/new", {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: rawItem,
				redirect: 'follow'
			}).then(response => response.text())
			.then(result => {
				console.log(result);
				if(result.status === 200) {
					alert("Item has successfully been registered!");
					window.localStorage.removeItem('nextRoute');
					window.location = "/";
				} 
				else {
					alert("Error registering item! Please try again later or contact support at (479) 866-7051.");
				}
			})
			.catch(error => alert("Error registering item! Please try again later or contact sales support at (479) 866-7051."))
	 		.finally(() => setLoading(false));
		} 
		else {
			setLoading(false);
		}
	}

	function clearEntries() {
		setProductID("");
		setName("");
		setPrice("");
		setImage("");
		setStock("");
		setCreatedOn("");
	}

	function validateEntries() {
		if(productID === "" || !/^[0-9]{1,5}$/.test(productID)) {
			alert("Item ID should be a numeric value with 5 or fewer numbers!"); //Update
			return false;
		}
		if(name === "") {
			alert("Item name should not be empty!");
			return false;
		}
		if(price === "") {
			alert("Item does not have a price!");
			return false;
		}
		if(img === "") {
			alert("Item does not have an image!");
			return false;
		}
		return true;
	}

	function ImgHandler() {
		
		const onChange = (imageList, addUpdateIndex) => {
			setImages(imageList);
		};

		function hideBtn(hide)
		{
			var btn = document.getElementById("UploadButton");
			if(hide)
				btn.style.display = "none";
			else
				btn.style.display = "inline-block";
		}
		
		return(
			<div className="ImgHandler">
				<ImageUploading
					value = {images}
					onChange = {onChange}
					acceptType = {['jpg', 'png', 'jpeg']}
					dataURLKey = "data_url"
				>
					{({imageList, onImageUpload, onImageRemove, isDragging, dragProps}) => (
						<div className = {styles.image_wrap}>
							<button 
								id = {"UploadButton"}
								className = {styles.button}
								style = {isDragging ? { color: "#b3cae5" } : null}
								onClick = {onImageUpload}
								{...dragProps}
							>
								Click or Drop Image Here
							</button>
							{imageList.map((image, index) => (
								<div key = {index} className = {styles.image_item} >
									<img 
										className ={styles.image} 
										src = {image.data_url} 
										alt = "" width = "300" 
										onLoad = {() => {
											setImage(image.data_url);
											hideBtn(true);
										}}
									/>
									<div className = {styles.button_wrap}>
										<button 
											className = {styles.button2} 
											onClick = {() => {
												onImageRemove(index); 
												hideBtn(false);
											}} 
										> 
											X 
										</button>
									</div>
								</div>
							))}
						</div>
					)}
				</ImageUploading>
			</div>
		);
	}

    const location = useLocation();
    window.localStorage.setItem('nextRoute', location.pathname);
    const user = JSON.parse(window.localStorage.getItem('user'));
    var manager;
    if(user !== null) {
        manager = user.manager;
    }
    if(user) {
       // return <Redirect to="/" />
    } else {
        return (
            <div> 
                <div className={styles.rootDiv}>
///////THIS IS SARAHS CODE
                {
                    //inline if statement, checking if manager is true or false, if true then button if not then null.
                    //the {} is a way to get back into javascript mode
                    user.manager ? 
                    <div className={classNames(styles.Rectangle, styles.Text)} onClick={()=>alert("Functionality has not yet been implemented")}>
                    <Plus className={classNames(styles.Icon, styles.noHover)}/>
                    <div className={classNames(styles.Text)}>Create Item</div>
                    </div>
                    : null
                }
					<Item
					className={styles.Rectangle}
                    //passing to the item component, the only ones ill use are price name and image
					item={{"productID": 1,
                    "price": "20.50",
                    "stock": 1,
                    "image": <img className={styles.ItemBubble} src={"https://images.unsplash.com/photo-1588613254520-9d722c39aad5"}/>,
                    "name": "Benedryll"}}
					/>
                    {/*This is where everything relating to transaction component in here, 
                    this is where everything displayed will go, aka like fields*/
                    }
//////END OF SARAHS CODE FOR ITEM COMPONENT
                    <div className={styles.block}>
                        <TextField
                            className={styles.loginfield}
                            label="Product ID"
                            placeholder="Ex. 12345"
                            value={productID}
                            onChange={e => setProductID(e.target.value)}
                        />
						<TextField
                            className={styles.loginfield}
                            label="Product Name"
                            placeholder="Ex. Pills"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
						<TextField
                            className={styles.loginfield}
                            label="Product Price"
                            placeholder="Ex. 15.00"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
						<TextField
                            className={styles.loginfield}
                            label="Current Stock"
                            placeholder="Ex. 30"
                            value={stock}
                            onChange={e => setStock(e.target.value)}
                        />
						
						<TextField
                            className={styles.loginfield}
                            label="Date Created"
                            placeholder="Ex. 4/1/2021"
                            value={createdOn}
                            onChange={e => setCreatedOn(e.target.value)}
                        />
				
						<div className = {styles.TextFieldHeader}>Upload Image</div>
						<ImgHandler/>
                    </div>
                </div>
                <Sidenav/>
            </div>
        )
    }
}

export default ProductListing;