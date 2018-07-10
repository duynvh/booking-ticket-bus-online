import React, { Component } from 'react';
import {connect} from 'react-redux';
import CKEditor from "react-ckeditor-component";
import axios from 'axios';
import PropTypes from "prop-types";
import * as actions from '../../../actions/article';
import * as notices from './../../../constants/Notice';
import * as configs from '../../../constants/Config';
class Form extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
			title: '',
            status: 'active',
            ordering: 0,
            msg: '',
            categories_article: [],
            category_article_id: '',
            description: '', 
            content: ''
        };

        this.props.clearMsg();

        this.updateContent = this.updateContent.bind(this);
        this.onChange      = this.onChange.bind(this);
        this.onBlur        = this.onBlur.bind(this);
        this.afterPaste    = this.afterPaste.bind(this);
    }

    loadCategory() {
        let url = `${configs.BASE_URL}category-article`;
        axios.get(url).then(response => {
            let data = response.data;
            this.setState({
                categories_article: data,
                category_article_id: data[0]._id
            });
        });
    }

    componentWillMount() {
        this.loadCategory();
    }

    renderSelectedCategory = (categories_article) => {
        let xhtml = null;
        if(categories_article.length > 0) {
            xhtml = categories_article.map((category, index) => {
                return (
                    <option key={index} value={category._id}>{category.name}</option>                        
                );
            });
        }
        return xhtml;
    }
    
    handleSubmit = (event) => {
        this.props.clearMsg();
        let {title, status, ordering, category_article_id, description, content} = this.state;
        if(title === "") {
            this.setState({
                msg: 'Please input name title'
            });
        }
        else {
            let formProps = {
                title, 
                category_article_id,
                description,
                status,
                ordering,
                content
            };
            this.props.createArticle(formProps, () => {
                this.context.router.history.push('/admin/article');
            });
        }
        event.preventDefault();
    }


    updateContent(newContent) {
        this.setState({
            content: newContent
        })
    }

    onChange(evt){
        var newContent = evt.editor.getData();
        this.setState({
            content: newContent
        });  
    }

    onBlur(evt){
      var newContent = evt.editor.getData();
        this.setState({
            content: newContent
        });  
    }
    
    afterPaste(evt){
        var newContent = evt.editor.getData();
        this.setState({
            content: newContent
        });  
    }

    handleChange = (event) => {
        const target = event.target;    // input selectbox
        const value  = target.type === 'checkbox' ? target.checked : target.value;
        const name   = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        let {categories_article} = this.state;
        let xhtml = null;
        let styleAlert = 'danger';
        if(this.props.message) {
            if(this.props.message !== notices.ERROR_MESSAGE_CREATE_GROUP && this.props.message !== notices.EXISTING_NAME_GROUP) styleAlert = 'success';
            xhtml = <div className={`alert alert-${styleAlert} alert-dismissible`}>
                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                        {this.props.message}
                    </div>;
        }
        else if(this.state.msg) {
            xhtml = <div className={`alert alert-${styleAlert} alert-dismissible`}>
                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                        {this.state.msg}
                    </div>;
        }

        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Add Article</h3>
                                </div>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="card-body">
                                        {xhtml}
                                        <div className="form-group">
                                            <label htmlFor="title">Title</label>
                                            <input required value={this.state.title} onChange={this.handleChange} name="title" type="text" className="form-control" id="title" placeholder="Enter title" />
                                        </div>
                                        <div className="form-group">
                                            <label>Category Name</label>
                                            <select onChange={this.handleChange} value={this.state.category_article_id} name="category_article_id" className="form-control">
                                                {this.renderSelectedCategory(categories_article)}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description">Description</label>
                                            <textarea value={this.state.description} name="description" className="form-control" onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="content">Content</label>
                                            <CKEditor 
                                              activeClass="p10" 
                                              content={this.state.content} 
                                              events={{
                                                "blur": this.onBlur,
                                                "afterPaste": this.afterPaste,
                                                "change": this.onChange
                                              }}
                                             />
                                        </div>
                                        <div className="form-group">
                                            <label>Status</label>
                                            <select onChange={this.handleChange} value={this.state.status} name="status" className="form-control">
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="ordering">Ordering</label>
                                            <input required value={this.state.ordering} onChange={this.handleChange} name="ordering" type="number" className="form-control" id="ordering" placeholder="Enter ordering" />
                                        </div>
                                        <button type="submit" className="btn btn-primary" style={{marginRight:'10px'}}>Submit</button>      
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return { 
        message: state.article.message,
    };
}

export default connect(mapStateToProps, actions)(Form);