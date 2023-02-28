import React from "react";
import Calendar from "rc-year-calendar";
import "react-bootstrap";
import { Button, Modal } from "react-bootstrap";

// const { Modal, Button } = ReactBootstrap;
const currentYear = new Date().getFullYear();

export class MyCalendar extends React.Component {
  constructor() {
    super();
    this.state = {
      dataSource: [
        {
          id: 0,
          name: "Google I/O",
          location: "San Francisco, CA",
          startDate: new Date(currentYear, 4, 28),
          endDate: new Date(currentYear, 4, 29),
        },
        {
          id: 1,
          name: "Microsoft Convergence",
          location: "New Orleans, LA",
          startDate: new Date(currentYear, 2, 16),
          endDate: new Date(currentYear, 2, 19),
        },
        {
          id: 2,
          name: "Microsoft Build Developer Conference",
          location: "San Francisco, CA",
          startDate: new Date(currentYear, 3, 29),
          endDate: new Date(currentYear, 4, 1),
        },
        {
          id: 3,
          name: "Apple Special Event",
          location: "San Francisco, CA",
          startDate: new Date(currentYear, 8, 1),
          endDate: new Date(currentYear, 8, 1),
        },
        {
          id: 4,
          name: "Apple Keynote",
          location: "San Francisco, CA",
          startDate: new Date(currentYear, 8, 9),
          endDate: new Date(currentYear, 8, 9),
        },
        {
          id: 5,
          name: "Chrome Developer Summit",
          location: "Mountain View, CA",
          startDate: new Date(currentYear, 10, 17),
          endDate: new Date(currentYear, 10, 18),
        },
        {
          id: 6,
          name: "F8 2015",
          location: "San Francisco, CA",
          startDate: new Date(currentYear, 2, 25),
          endDate: new Date(currentYear, 2, 26),
        },
        {
          id: 7,
          name: "Yahoo Mobile Developer Conference",
          location: "New York",
          startDate: new Date(currentYear, 7, 25),
          endDate: new Date(currentYear, 7, 26),
        },
        {
          id: 8,
          name: "Android Developer Conference",
          location: "Santa Clara, CA",
          startDate: new Date(currentYear, 11, 1),
          endDate: new Date(currentYear, 11, 4),
        },
        {
          id: 9,
          name: "LA Tech Summit",
          location: "Los Angeles, CA",
          startDate: new Date(currentYear, 10, 17),
          endDate: new Date(currentYear, 10, 17),
        },
      ],
      currentEvent: null,
    };
  }

  saveCurrentEvent() {
    if (this.state.currentEvent.id === undefined) {
      // Add event
      this.state.currentEvent.id =
        Math.max(...this.state.dataSource.map((evt) => evt.id)) + 1;
      this.setState({
        dataSource: this.state.dataSource.concat([this.state.currentEvent]),
        currentEvent: null,
      });
    } else {
      // Update event
      var ds = this.state.dataSource;
      var index = ds.findIndex((evt) => evt.id == this.state.currentEvent.id);
      ds[index] = this.state.currentEvent;
      this.setState({ dataSource: ds, currentEvent: null });
    }

    this.setState({ currentEvent: null });
  }

  render() {
    return (
      <div>
        <Calendar
          minDate={new Date()}
          enableRangeSelection={true}
          enableContextMenu={true}
          contextMenuItems={[
            {
              text: "Update",
              click: (evt) => this.setState({ currentEvent: evt }),
            },
            {
              text: "Delete",
              click: (evt) =>
                this.setState({
                  dataSource: this.state.dataSource.filter(
                    (item) => item.id != evt.id
                  ),
                }),
            },
          ]}
          onRangeSelected={(e) =>
            this.setState({
              currentEvent: { startDate: e.startDate, endDate: e.endDate },
            })
          }
          dataSource={this.state.dataSource}
        />
        <Modal
          show={this.state.currentEvent}
          onHide={() => this.setState({ currentEvent: null })}
        >
          {this.state.currentEvent && (
            <div>
              <Modal.Header closeButton>
                <Modal.Title>
                  {this.state.currentEvent.id !== undefined
                    ? "Update event"
                    : "Add event"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form className="form-horizontal">
                  <div className="form-group row">
                    <label
                      htmlFor="event-name"
                      className="col-sm-2 control-label"
                    >
                      Name
                    </label>
                    <div className="col-sm-10">
                      <input
                        id="event-name"
                        type="text"
                        className="form-control"
                        value={this.state.currentEvent.name}
                        onChange={(e) =>
                          this.setState({
                            currentEvent: {
                              ...this.state.currentEvent,
                              name: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="event-location"
                      className="col-sm-2 control-label"
                    >
                      Location
                    </label>
                    <div className="col-sm-10">
                      <input
                        id="event-location"
                        type="text"
                        className="form-control"
                        value={this.state.currentEvent.location}
                        onChange={(e) =>
                          this.setState({
                            currentEvent: {
                              ...this.state.currentEvent,
                              location: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="min-date"
                      className="col-sm-2 control-label"
                    >
                      Dates
                    </label>
                    <div className="col-sm-10">
                      <div className="input-group input-daterange">
                        <input
                          id="min-date"
                          type="date"
                          className="form-control"
                          value={this.state.currentEvent.startDate
                            .toISOString()
                            .substr(0, 10)}
                          onChange={(e) =>
                            this.setState({
                              currentEvent: {
                                ...this.state.currentEvent,
                                startDate: e.target.valueAsDate,
                              },
                            })
                          }
                        />
                        <div className="input-group-prepend input-group-append">
                          <div className="input-group-text">to</div>
                        </div>
                        <input
                          type="date"
                          className="form-control"
                          value={this.state.currentEvent.endDate
                            .toISOString()
                            .substr(0, 10)}
                          onChange={(e) =>
                            this.setState({
                              currentEvent: {
                                ...this.state.currentEvent,
                                endDate: e.target.valueAsDate,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => this.setState({ currentEvent: null })}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={() => this.saveCurrentEvent()}
                >
                  Save event
                </Button>
              </Modal.Footer>
            </div>
          )}
        </Modal>
      </div>
    );
  }
}
