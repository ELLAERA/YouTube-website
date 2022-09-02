import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';

const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
    { value: 0, label: "Private" },
    { value: 1, label: "Public" }
]

const CategoryOptions = [
    { value: 0, label: "Film & Animation" },
    { value: 1, label: "Autos & Vehicles" },
    { value: 2, label: "Music" },
    { value: 3, label: "Pets & Animals" },
    { value: 4, label: "Sports" }
]

function VideoUploadPage(){

    const [VideoTitle, setVideoTitle] = useState(""); 
    const [Description, setDescription] = useState("");
    const [Private, setPrivate] = useState(0); 
    const [Category, setCategory] = useState("Film & Animation"); 
    const [FilePath, setFilePath] = useState("")

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }

    const onDesciptionChange = (e) => {
        setDescription(e.currentTarget.value)
    } 

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    } 

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    } 

    const onSubmit = () => {
    }

    const onDrop = ( files ) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        console.log(files)
        formData.append("file", files[0])

        Axios.post('/api/video/uploadfiles', formData, config)
        .then(response=> {
            if(response.data.success){

                let variable = {
                    filePath: response.data.filePath,
                    fileName: response.data.fileName
                }
                setFilePath(response.data.filePath)

                //gerenate thumbnail with this filepath ! 

            } else {
                alert('failed to save the video in server')
            }
        })

    }
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Title level={2} > Upload Video</Title>
                </div>

                <Form onSubmit={onSubmit}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                        {/* Drop zone */}
                        <Dropzone 
                            onDrop={onDrop}
                            multiple={false}
                            maxSize={800000000}>
                            {({ getRootProps, getInputProps }) => (
                                <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    {...getRootProps()}
                                >
                                    <input {...getInputProps()} />
                                    <Icon type="plus" style={{ fontSize: '3rem' }} />
                                </div>
                            )}
                        </Dropzone>

                        {/* Thumbnail */}
                        <div>
                            
                        </div>
                </div>

                <br />
                <br />
                <label>Title</label>
                <Input 
                    onChange={onTitleChange}
                    value={VideoTitle}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea 
                    onChange={onDesciptionChange}
                    value={Description}
                />

                <br />
                <br /> 
                <select onChange={onPrivateChange}>
                            {PrivateOptions.map((item, index) => (
                                    <option key={index} value={item.value}>
                                        {item.label}
                                    </option>
                            ))}
                </select>

                <br />
                <br />  
                <select onChange={onCategoryChange}>
                            {CategoryOptions.map((item, index) => (
                                    <option key={index} value={item.label}>
                                        {item.label}
                                    </option>
                            ))}
                </select>

                <br />
                <br />
                <Button type='primary' size='large' onClick={onsubmit}>
                    Submit
                </Button>

            </Form>
        </div>
    )
}

export default VideoUploadPage