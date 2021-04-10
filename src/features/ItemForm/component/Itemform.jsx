
import styles from "./Itemform.module.scss";
import React, { useState } from 'react';
import {TextField} from "../../../common/input/text_field/component/TextField";
import ImageUploading from "react-images-uploading";
import { X } from "react-feather";


export function ItemForm(props) {
	var {item, ...props} = props;
    const [loading, setLoading] = useState(false);
    const [productID, setProductID] = useState(item.productID);
    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price);
    const [img, setImage] = useState(""); //Update
	const [images, setImages] = useState([]); //for ImgHandler
    const [stock, setStock] = useState(item.stock);
    const [createdOn, setCreatedOn] = useState(item.createdOn);
	const [editImg, setEditImg] = useState(false);
	const user = JSON.parse(window.localStorage.getItem('user'));
	

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

			var endpoint;
			if(item !== null) {
				endpoint = "https://gsa-backend-api.herokuapp.com/products/update";
			} else {
				endpoint = "https://gsa-backend-api.herokuapp.com/products/new";
			}

			fetch(endpoint, {
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
		console.log("EDIT", editImg)
		if(editImg) {
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
		} else {
			return <img className={styles.image} src={item.image} />
		}
	}
    return (
        <div className={styles.rootDiv}>
            <div className={styles.block}>
				<button
					className={styles.closeBtn}
					onClick={props.close}
				>
					<X />
				</button>
                <TextField
                    className={styles.field}
                    label="Product ID"
					disabled={true}
                    placeholder="Ex. 12345"
                    value={productID}
                    onChange={e => setProductID(e.target.value)}
                />
                <TextField
                    className={styles.field}
                    label="Product Name"
                    placeholder="Ex. Pills"
                    value={name}
					disabled={!user.manager}
                    onChange={e => setName(e.target.value)}
					/>
                <TextField
                    className={styles.field}
					disabled={!user.manager}
                    label="Product Price"
                    placeholder="Ex. 15.00"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
					/>
                <TextField
                    className={styles.field}
					disabled={!user.manager}
                    label="Current Stock"
                    placeholder="Ex. 30"
                    value={stock}
                    onChange={e => setStock(e.target.value)}
					/>
                <div className = {styles.TextFieldHeader}>Upload Image</div>
				{
					user.manager ?
						<div className={styles.editImage}>
							<input
								type="checkbox"
								checked={editImg}
								onChange={(e) => {
									setEditImg(e.target.checked);
								}}
							/>
							Edit Image?
						</div>
					: null
				}
                <ImgHandler/>

				{
					user.manager ?
						<div className={styles.editImage}>
							<button 
								className={styles.button}
								onClick={registerProduct}
							>
								Upload Item Data
							</button>
						</div>
					: null
				}
            </div>
        </div>
    )
}

export default ItemForm;