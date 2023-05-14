import React, { useState } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import { Form, FloatingLabel, Button, Row, Col } from 'react-bootstrap'
import { eventNames } from 'process'
import { Constants } from '../../constants'

interface PropsType {
  id: string
  cellValue: CellValue
  handleSubmit: (key: string, value: CellValue) => void
  courses: Course[]
}
const CellForm = (props: PropsType) => {
  const [cellValue, setCellValue] = useState<CellValue>(props.cellValue)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCellValue({ ...cellValue, [event.target.name]: event.target.value })
  }
  const [showPopover, setShowPopover] = useState(false)

  const handleFocusOut = () => {
    setShowPopover(false)
  }
  const cellFormat = (data: CellValue) => {
    if (typeof data.name == 'undefined' || typeof data.loc == 'undefined')
      return ' + '
    return data.name + '|' + data.loc
  }
  return (
    <>
      <OverlayTrigger
        trigger='click'
        placement='right'
        show={showPopover}
        onToggle={setShowPopover}
        rootClose={true}
        rootCloseEvent='mousedown'
        overlay={
          <Popover id={'popover' + props.id}>
            <Popover.Header as='h3'>Lecture Form</Popover.Header>
            <Popover.Body>
              <Row>
                <Col>
                  <FloatingLabel controlId='courseSelect' label='Select Course'>
                    <Form.Select
                      value={
                        typeof cellValue == 'undefined'
                          ? ''
                          : cellValue.courseCode
                      }
                      name='name'
                      onChange={(event) => {
                        setCellValue({
                          ...cellValue,
                          [event.target.name]: event.target.value,
                        })
                        console.log(event.target)
                      }}
                    >
                      <option value=''>Choose...</option>
                      {props.courses.map((c) => (
                        <option key={c.code} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel controlId='groupInput' label='Group Name'>
                    <Form.Control
                      type='text'
                      placeholder='Enter Group Name'
                      name='grp'
                      value={
                        typeof cellValue == 'undefined'
                          ? cellValue
                          : cellValue.grp
                      }
                      onChange={handleInputChange}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row style={{ marginTop: '8px', marginBottom: '8px' }}>
                <Col>
                  <FloatingLabel controlId='locInput' label='Location'>
                    <Form.Control
                      type='text'
                      name='loc'
                      placeholder='Enter location'
                      value={
                        typeof cellValue == 'undefined'
                          ? cellValue
                          : cellValue.loc
                      }
                      onChange={handleInputChange}
                    />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel
                    controlId='typeSelect'
                    label='Select Course Type'
                  >
                    <Form.Select
                      value={
                        typeof cellValue == 'undefined' ? '' : cellValue.type
                      }
                      name='type'
                      onChange={(event) => {
                        setCellValue({
                          ...cellValue,
                          [event.target.name]: event.target.value,
                        })
                        console.log(event.target)
                      }}
                    >
                      <option value=''>Choose...</option>
                      {Constants.types.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>
              </Row>
              <button
                onClick={() => {
                  handleFocusOut()
                  props.handleSubmit(props.id, cellValue)
                  console.log(cellValue)
                }}
              >
                Submit
              </button>
            </Popover.Body>
          </Popover>
        }
      >
        <span onBlur={handleFocusOut} style={{ width: '100%', height: '100%' }}>
          <div>
            {typeof cellValue == 'undefined' ? '  +  ' : cellFormat(cellValue)}
          </div>
        </span>
      </OverlayTrigger>
    </>
  )
}

export default CellForm
