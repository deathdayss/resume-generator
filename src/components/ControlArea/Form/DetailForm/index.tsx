import FormCard from "../FormCard";
import { SectionFormProps } from "../type";
import { Checkbox, Form, Input } from 'antd';
import { useState } from "react";

interface DetailFormProps extends SectionFormProps {

}

const DetailForm = ({ sectionForm }: DetailFormProps) => {
    const [useInput, setUseInput] = useState(true);
    return <FormCard>
        <div onClick={() => {
            setUseInput(!useInput)
        }}>change item</div>
        {/* {useInput ? <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input />
        </Form.Item> : <Input />} */}
        {useInput ? <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }] }
        >
            <Input  />
        </Form.Item> : null}
        <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password />
        </Form.Item>
        <div>Detail Form</div>
    </FormCard >
}

export default DetailForm;