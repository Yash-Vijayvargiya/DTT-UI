import React, { useEffect, useState } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import { Form, FloatingLabel, Button, Row, Col } from 'react-bootstrap'
import { eventNames } from 'process'
import { Constants } from '../../constants'

interface PropsType {
  index: number
  id: string
  cellValue: CellValue
  handleSubmit: (key: string, value: CellValue, index: number) => void
  handleDelete: (key: string, value: CellValue, index: number) => void

  courses: Course[]
}
type StateDictionary = {
  [key: string]: string
}
const CellForm = (props: PropsType) => {
  const [cellValue, setCellValue] = useState<CellValue>(props.cellValue)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCellValue({ ...cellValue, [event.target.name]: event.target.value })
  }
  const [showPopover, setShowPopover] = useState(false)
  const courseMap: StateDictionary = {}
  const [cMap, setcMap] = useState<StateDictionary>({})
  const handleFocusOut = () => {
    setShowPopover(false)
  }
  useEffect(() => {
    props.courses.map((c) => (courseMap[c.code] = c.shortName))
    setcMap(courseMap)
  }, [props.courses])
  useEffect(() => {
    props.courses.map((c) => (courseMap[c.code] = c.shortName))
    console.log(courseMap)
    setcMap(courseMap)
  }, [])
  useEffect(() => {
    setCellValue(props.cellValue)
  }, [props.cellValue])
  const cellFormat = (data: CellValue) => {
    if (
      typeof data.name == 'undefined' ||
      typeof data.loc == 'undefined' ||
      data.courseCode === ''
    )
      return ' + '
    if (data.type.toLowerCase() === 'class') return data.name + ' ' + data.loc
    if (data.type.toLowerCase() === 'tut')
      return data.name + ' tut ' + data.grp + ' ' + data.loc
    if (data.type.toLowerCase() === 'lab')
      return data.name + ' ' + data.grp + ' ' + data.loc
    return ' + '
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
                      name='courseCode'
                      onChange={(event) => {
                        setCellValue({
                          ...cellValue,
                          [event.target.name]: event.target.value,
                          name: cMap[event.target.value],
                        })
                        console.log(cMap)
                      }}
                    >
                      <option value=''>Choose...</option>
                      {props.courses.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.shortName}
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
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    onClick={() => {
                      handleFocusOut()
                      props.handleSubmit(props.id, cellValue, props.index)
                      console.log(cellValue)
                    }}
                  >
                    Submit
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant='danger'
                    onClick={() => {
                      handleFocusOut()
                      props.handleDelete(props.id, cellValue, props.index)
                      console.log(cellValue)
                    }}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
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
