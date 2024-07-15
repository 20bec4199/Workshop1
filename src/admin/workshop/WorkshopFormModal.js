import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker, InputNumber, Button } from 'antd';
import moment from 'moment';

const WorkshopFormModal = ({ visible, workshopData, setWorkshopData, selectedDate, setSelectedDate, onCreate, onUpdate, onCancel }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (visible) {
      if (workshopData) {
        console.log('true');
        form.setFieldsValue({
          title: workshopData.title,
          description: workshopData.description,
          date: moment(selectedDate),
          maxParticipants: workshopData.maxParticipants,
        });
      } else {
        console.log('false');
        form.resetFields();
        if (selectedDate) {
          form.setFieldsValue({
            date: moment(selectedDate),
          });
        }
      }
    }
  }, [workshopData, selectedDate, visible, onCancel, form]);
  const handleOk = () => {
    form.validateFields().then(values => {
      form.resetFields();

      if (workshopData) {
        onUpdate({ ...values, id: workshopData._id }); // Pass workshop id for update
      } else {
        onCreate(values);
        setWorkshopData(null);

      }
      onCancel();
    });
  };

  return (
    <Modal
      visible={visible}
      title={workshopData ? 'Update Workshop' : 'Create Workshop'}
      okText={workshopData ? 'Update' : 'Create'}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical" name="workshop_form">
        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the title' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter the description' }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select the date' }]} >
          <DatePicker disabled={true} />
        </Form.Item>
        <Form.Item name="maxParticipants" label="Max Participants" rules={[{ required: true, message: 'Please enter the Max Participants count' }]}>
          <InputNumber />
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default WorkshopFormModal;
