
import React, {Component, Fragment} from 'react'
import Moment from 'react-moment'
import star from '../../assets/images/star.png'
import { Modal, Input, Button } from "react-materialize"
import RichTextEditor from 'react-rte'

function fancifyContent(datum, content) {
  console.log("fancy before", datum && datum.id, content)
  datum.content = RichTextEditor.createValueFromString(content || '', 'html')
  console.log("fancy after")
  return datum
}

class JournalsList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      listOfJournal: []
    }
  }

  componentDidMount () {
    $.get(`/users/${this.props.currentUserId}/journals`, (data) => {
      if (data) {
        this.setState({listOfJournal: data.map(datum => fancifyContent(datum, datum.content))})
      }
    })
  }

  deleteJournal (id) {
    const result = window.confirm('Do you really want delete it?')
    if (result) {
      $.ajax({
        url: `/users/${this.props.currentUserId}/journals/${id}`,
        type: 'DELETE',
        success: () => {
          $.get(`/users/${this.props.currentUserId}/journals`, (data) => {
            if (data) {
              this.setState({listOfJournal: data.map(datum => fancifyContent(datum, datum.content))})
            }
          })
        }
      })
    }
  }

  onJournalChange (journalId, content) {
    console.log("update journal data for journal id", journalId, "to this:", content)
    // this.state.listOfJournal
    //   .filter(datum => datum.id === journalId)
    //   .map(datum => fancifyContent(datum, content))
  }

  // closeModal = () => {
  //   $('#' + this.uniqueId).modal('close');
  // }

  render () {
    const buttonStyle = {backgroundColor: 'rgb(120, 205, 235)', float: 'left', padding: '-10px', marginLeft: '10px'}
    return (
      // Main div starts here.
      <div className="container">
        <h1 className="journals-header">
          <div id="journals-title"> Reflections </div>
        </h1>

        {/* Flower */}

        <div id="position" className="sunflower">
          <div className="head">
            <div id="eye-1" className="eye"></div>
            <div id="eye-2" className="eye"></div>
            <div className="mout"></div>
          </div>
          <div className="petals"></div>
          <div className="trunk">
            <div className="left-branch"></div>
            <div className="right-branch"></div>
          </div>
          <div className="vase"></div>
        </div>
        {/* end Flower */}

        {this.state.listOfJournal.map(journal =>

          <div key={journal.id}>

            <div className="journals-container">

              <h5 className="journal-header individual-journal">
                <Moment className="journal-date" format="MMMM Do YYYY">{journal.date}</Moment>
                <br/>
                <Moment className="journal-fromnow" fromNow>{journal.date}</Moment>
                <img src={star} alt="star" className='journal-star' />

                { journal.sentiment_score > 0 && journal.sentiment_score < 0.5
                  && <img src={star} alt="star" className='journal-star' />
                }

                { journal.sentiment_score >= 0.5
                  && <Fragment><img src={star} alt="star" className='journal-star' /> <img src={star} alt="star" className='journal-star' /></Fragment>
                }


              </h5>
              <div className="journal-content" dangerouslySetInnerHTML={{ __html: journal.content }} />
              <div className='journal-footer'>
              <Modal
                  header={ journal.date }
                  trigger={
                    <Button style={buttonStyle}> EDIT
                      
                    </Button>
                  }
                  actions={
                    <React.Fragment>
                      {/* <Button onClick={this.handleJournalSubmit}>OK</Button>
                      <Button onClick={this.closeModal} flat={true}>Close</Button> */}
                    </React.Fragment>
                  }
                >
                {/* {journal.content} */}
                  <RichTextEditor
                    value={journal.content}
                    />
            </Modal>

                {/* <button className="journal-button"> Edit </button> */}
                <button  className="btn" style={buttonStyle} onClick={this.deleteJournal.bind(this, journal.id)} > DELETE </button>
              </div>
            </div>
          </div>
        )}
      </div> // main Div Container here
    ) // return Bracket Ends here
  } // render Function ends here
} // class Ends here.

export default JournalsList




//                         onChange={this.onJournalChange.bind(this, journal.id)}
