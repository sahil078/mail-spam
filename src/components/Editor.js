import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor = ({ value, onChange }) => {
    const modules = {
        toolbar: {
            container: [
                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                [{size: []}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, 
                 {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image'],
                [{ 'align': [] }],
                ['save', 'variables'],  // Add custom buttons here
                ['clean']                                        
            ],
            handlers: {
                'save': handleSave,
                'variables': handleVariables,
            }
        },
    };

    const handleSave = () => {
        alert('Save button clicked!');
        // Implement save logic here
    };

    const handleVariables = () => {
        alert('Variables button clicked!');
        // Implement variables logic here
    };

    return (
        <ReactQuill
            value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}
        />
    );
};

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'align',
];

export default Editor;

