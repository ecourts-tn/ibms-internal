import React from 'react'

const Dashboard = () => {
  return (
    <>
        <div className="content-wrapper">
            <div className="container-fluid">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h3 className="m-0"><strong>Dashboard</strong></h3>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Dashboard</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <h3>150</h3>
                                        <p>Pending Petitions</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-bag" />
                                    </div>
                                    <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-success">
                                    <div className="inner">
                                        <h3>53</h3>
                                        <p>Completed Petitions</p>
                                    </div>
                                    <div className="icon">
                                    <i className="ion ion-stats-bars" />
                                    </div>
                                    <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-warning">
                                    <div className="inner">
                                        <h3>44</h3>
                                        <p>Returned Petitions</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-person-add" />
                                    </div>
                                    <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-danger">
                                    <div className="inner">
                                        <h3>65</h3>
                                        <p>Rejected Petitions</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-pie-graph" />
                                    </div>
                                    <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="card">
                                    <div className="card-header border-0 bg-success">
                                    <h3 className="card-title">
                                        <i className="far fa-calendar-alt" />
                                        Calendar
                                    </h3>
                                    <div className="card-tools">
                                        <div className="btn-group">
                                        <button type="button" className="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown" data-offset={-52}>
                                            <i className="fas fa-bars" />
                                        </button>
                                        <div className="dropdown-menu" role="menu">
                                            <a href="#" className="dropdown-item">Add new event</a>
                                            <a href="#" className="dropdown-item">Clear events</a>
                                            <div className="dropdown-divider" />
                                            <a href="#" className="dropdown-item">View calendar</a>
                                        </div>
                                        </div>
                                        <button type="button" className="btn btn-success btn-sm" data-card-widget="collapse">
                                        <i className="fas fa-minus" />
                                        </button>
                                        <button type="button" className="btn btn-success btn-sm" data-card-widget="remove">
                                        <i className="fas fa-times" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div id="calendar" style={{width: '100%'}} />
                                </div>
                            </div>
                            </div>
                            <div className="col-md-9">
                                <div className="card">
                                    <div className="card-header">
                                    <h3 className="card-title">
                                        <i className="ion ion-clipboard mr-1" />
                                        To Do List
                                    </h3>
                                    <div className="card-tools">
                                        <ul className="pagination pagination-sm">
                                        <li className="page-item"><a href="#" className="page-link">«</a></li>
                                        <li className="page-item"><a href="#" className="page-link">1</a></li>
                                        <li className="page-item"><a href="#" className="page-link">2</a></li>
                                        <li className="page-item"><a href="#" className="page-link">3</a></li>
                                        <li className="page-item"><a href="#" className="page-link">»</a></li>
                                        </ul>
                                    </div>
                                    </div>
                                    <div className="card-body">
                                    <ul className="todo-list" data-widget="todo-list">
                                        <li>
                                        <span className="handle">
                                            <i className="fas fa-ellipsis-v" />
                                            <i className="fas fa-ellipsis-v" />
                                        </span>
                                        <div className="icheck-primary d-inline ml-2">
                                            <input type="checkbox" defaultValue name="todo1" id="todoCheck1" />
                                            <label htmlFor="todoCheck1" />
                                        </div>
                                        <span className="text">Design a nice theme</span>
                                        <small className="badge badge-danger"><i className="far fa-clock" /> 2 mins</small>
                                        <div className="tools">
                                            <i className="fas fa-edit" />
                                            <i className="fas fa-trash-o" />
                                        </div>
                                        </li>
                                        <li>
                                        <span className="handle">
                                            <i className="fas fa-ellipsis-v" />
                                            <i className="fas fa-ellipsis-v" />
                                        </span>
                                        <div className="icheck-primary d-inline ml-2">
                                            <input type="checkbox" defaultValue name="todo2" id="todoCheck2" defaultChecked />
                                            <label htmlFor="todoCheck2" />
                                        </div>
                                        <span className="text">Make the theme responsive</span>
                                        <small className="badge badge-info"><i className="far fa-clock" /> 4 hours</small>
                                        <div className="tools">
                                            <i className="fas fa-edit" />
                                            <i className="fas fa-trash-o" />
                                        </div>
                                        </li>
                                        <li>
                                        <span className="handle">
                                            <i className="fas fa-ellipsis-v" />
                                            <i className="fas fa-ellipsis-v" />
                                        </span>
                                        <div className="icheck-primary d-inline ml-2">
                                            <input type="checkbox" defaultValue name="todo3" id="todoCheck3" />
                                            <label htmlFor="todoCheck3" />
                                        </div>
                                        <span className="text">Let theme shine like a star</span>
                                        <small className="badge badge-warning"><i className="far fa-clock" /> 1 day</small>
                                        <div className="tools">
                                            <i className="fas fa-edit" />
                                            <i className="fas fa-trash-o" />
                                        </div>
                                        </li>
                                        <li>
                                        <span className="handle">
                                            <i className="fas fa-ellipsis-v" />
                                            <i className="fas fa-ellipsis-v" />
                                        </span>
                                        <div className="icheck-primary d-inline ml-2">
                                            <input type="checkbox" defaultValue name="todo4" id="todoCheck4" />
                                            <label htmlFor="todoCheck4" />
                                        </div>
                                        <span className="text">Let theme shine like a star</span>
                                        <small className="badge badge-success"><i className="far fa-clock" /> 3 days</small>
                                        <div className="tools">
                                            <i className="fas fa-edit" />
                                            <i className="fas fa-trash-o" />
                                        </div>
                                        </li>
                                        <li>
                                        <span className="handle">
                                            <i className="fas fa-ellipsis-v" />
                                            <i className="fas fa-ellipsis-v" />
                                        </span>
                                        <div className="icheck-primary d-inline ml-2">
                                            <input type="checkbox" defaultValue name="todo5" id="todoCheck5" />
                                            <label htmlFor="todoCheck5" />
                                        </div>
                                        <span className="text">Check your messages and notifications</span>
                                        <small className="badge badge-primary"><i className="far fa-clock" /> 1 week</small>
                                        <div className="tools">
                                            <i className="fas fa-edit" />
                                            <i className="fas fa-trash-o" />
                                        </div>
                                        </li>
                                        <li>
                                        <span className="handle">
                                            <i className="fas fa-ellipsis-v" />
                                            <i className="fas fa-ellipsis-v" />
                                        </span>
                                        <div className="icheck-primary d-inline ml-2">
                                            <input type="checkbox" defaultValue name="todo6" id="todoCheck6" />
                                            <label htmlFor="todoCheck6" />
                                        </div>
                                        <span className="text">Let theme shine like a star</span>
                                        <small className="badge badge-secondary"><i className="far fa-clock" /> 1 month</small>
                                        <div className="tools">
                                            <i className="fas fa-edit" />
                                            <i className="fas fa-trash-o" />
                                        </div>
                                        </li>
                                    </ul>
                                    </div>
                                    <div className="card-footer clearfix">
                                    <button type="button" className="btn btn-primary float-right"><i className="fas fa-plus" /> Add item</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </>
  )
}

export default Dashboard