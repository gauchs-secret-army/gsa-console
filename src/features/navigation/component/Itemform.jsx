
import styles from "./Itemform.module.scss";
import React, { useState } from 'react';
import {Sidenav} from "../../../common/navigation/component/Sidenav";
import {TextField} from "../../../common/input/text_field/component/TextField";
import { Redirect, useLocation } from 'react-router';
import Item from "../../../common/features/component/Item";
import { Plus, Search } from 'react-feather';
import classNames from 'classnames';
import ImageUploading from "react-images-uploading";


export function Itemform() {
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
    return (
        <div className={styles.rootDiv}>
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
    )
}

export default Itemform;