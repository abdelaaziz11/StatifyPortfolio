import React,{useEffect,useState} from 'react';
import './Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import email from '../../Assests/email.png';
import linkedin from '../../Assests/linkedin.png';
import aboutimage from '../../Assests/images (3).jpeg';
import twitter from '../../Assests/x.png';
import videobg from '../../Assests/videobg.mp4';
import teamMember1 from '../../Assests/images (3).jpeg'; // Replace with your actual image path
import teamMember2 from '../../Assests/images (3).jpeg'; // Replace with your actual image path
import teamMember3 from '../../Assests/images (3).jpeg'; // Replace with your actual image path
import teamMember4 from '../../Assests/images (3).jpeg'; // Replace with your actual image path
import { useAuth } from '../../auth';
import Recipe from '../Recipe';
import {Modal,Form,Button} from 'react-bootstrap'
import{useForm} from 'react-hook-form'



const LoggedInHome=()=>{
  const[recipes,setRecipes]=useState([]);
  const[show,setShow]=useState(false)
  const{register,reset,handleSubmit,setValue,formState:{errors}}=useForm()
  const[recipeId,setRecipeId]=useState(0)
  useEffect(
      ()=>{
        fetch('/recipe/recipes')
        .then(res=>res.json())
        .then(data=>{
          
          setRecipes(data)
        })
        .catch(err=>console.log(err))
      },[]

  );

 

  const closeModal=()=>{
    setShow(false)
  }


  const showModal=(id)=>{
    setShow(true)
    setRecipeId(id)


    recipes.map(
      (recipe)=>{
        if(recipe.id===id){
          setValue('title',recipe.title)
          setValue('description',recipe.description)
        }
      }
    )
  }
  const updateRecipe=(data)=>{
    console.log(data)
    let token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');

    const requestOptions={
      method:'PUT',
      headers:{
        'content-type':'application/json',
        'Authorization':`Bearer ${JSON.parse(token)}`
      },
      body:JSON.stringify(data)
    }

    fetch(`/recipe/recipe/${recipeId}`,requestOptions)
    .then(res=>res.json())
    .then(data=>{  console.log(data)
      const reload = window.location.reload()
      reload()
    })
    .catch(err=>console.log(err))
    
    
  }
  return(
    <>
          <div className="recipe">
        {/* Modal for updating recipe */}
        <Modal show={show} size="lg" onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="full name"
                    {...register("title", { required: true, maxLength: 25})}
                    />
                </Form.Group>
                    {errors.title && <p><small style={{ color: 'red' }}>Title is required</small></p>}
                {errors.title?.type === "maxLength" && <p>
                    <small style={{ color: 'red' }}>Title should be less than 25 characters</small>
                </p>}
                <br></br>
                
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="address"
                    {...register('description', { required: true, maxLength: 255 })}
                    />
                </Form.Group>
                    {errors.description && <p><small style={{ color: 'red' }}>Description is required</small></p>}
                {errors.description?.type === "maxLength" && <p>
                    <small style={{ color: 'red' }}>Description should be less than 255 characters</small>
                </p>}

                {/* <br></br>
                <Form.Group>
                    <Form.Label>CNI</Form.Label>
                    <Form.Control type="textarea" row={5}
                    placeholder="CNI"
                    {...register('description', { required: true, maxLength: 255 })}
                    />
                </Form.Group>
                    {errors.description && <p><small style={{ color: 'red' }}>Description is required</small></p>}
                {errors.description?.type === "maxLength" && <p>
                    <small style={{ color: 'red' }}>Description should be less than 255 characters</small>
                </p>}

                <br></br>
                <Form.Group>
                    <Form.Label>Birthday Date</Form.Label>
                    <Form.Control type="date" row={5} 
                    {...register('description', { required: true, maxLength: 255 })}
                    />
                </Form.Group>
                    {errors.description && <p><small style={{ color: 'red' }}>Description is required</small></p>}
                {errors.description?.type === "maxLength" && <p>
                    <small style={{ color: 'red' }}>Description should be less than 255 characters</small>
                </p>}

                <br></br>
                <Form.Group>
                    <Form.Label>Sexe</Form.Label>
                    <Form.Control type="textarea" row={5} placeholder="sexe"
                    {...register('description', { required: true, maxLength: 255 })}
                    />
                </Form.Group>
                    {errors.description && <p><small style={{ color: 'red' }}>Description is required</small></p>}
                {errors.description?.type === "maxLength" && <p>
                    <small style={{ color: 'red' }}>Description should be less than 255 characters</small>
                </p>}

                <br></br> */}
                <Form.Group>
                    <Button variant="primary" onClick={handleSubmit(updateRecipe)}>Save</Button>
                </Form.Group>
                <Form.Group></Form.Group>
            </form>
          </Modal.Body>
        </Modal>

        <h1>List of Recipes</h1>
        {
        recipes.map((recipe,index) => (
          <Recipe
            key={index} // Ensure each recipe has a unique key
            title={recipe.title}
            description={recipe.description}
            onClick={()=>{showModal(recipe.id)}}
          />
        ))}
      </div>
    </>
  )
}


const LoggedOutHome =()=>{
  return(
    <>
              {/* HERO SECTION */}
          <section className="hero-section">
          <video src={videobg} autoPlay loop muted className="video-bg" />
          <div className="hero">
            <Link to="/login">
              <button className="btn-hero">Get Started</button>
            </Link>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="about-section" id="about">
          <div className="about">
            <h1 className="heading text-uppercase">About Us</h1>
            <span className="text-black-50">Statify is a Morocco statistics online</span>
            <div className="about-content">
              <div className="about-image">
                <img src={aboutimage} alt="about-image" />
              </div>
              <div className="about-info">
                <p>Statify is a groundbreaking platform designed to transform the way Morocco conducts its national census. Our mission is to streamline the data collection process by empowering citizens to participate directly. We believe that by modernizing this vital task, we can improve the accuracy, efficiency, and cost-effectiveness of large-scale statistical reporting. At Statify, we’re committed to innovation that benefits both the government and the people. Our platform enables individuals to easily input their own information, eliminating the need for traditional data collectors and saving valuable time and resources. Join us in building a smarter, more connected Morocco, where every voice matters, and every data point contributes to a brighter future.</p>
              </div>
            </div>
          </div>
        </section>

        {/* TEAM MEMBERS SECTION */}
        <section className="team-section" id="team">
          <h1 className="title text-uppercase">Our Team</h1>
          
          <Carousel interval={1000000} pause={false} controls={true}>
            <Carousel.Item>
              <img
                className="d-block"
                src={teamMember1}
                alt="First team member"
              />
              <Carousel.Caption>
                <h3>Mounim Nadir</h3>
                <p>Position and brief description of team member.</p>
                
                
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block"
                src={teamMember2}
                alt="Second team member"
              />
              <Carousel.Caption>
                <h3>Abdelaaziz Khouda</h3>
                <p>Position and brief description of team member.</p>
                
            </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block"
                src={teamMember3}
                alt="Third team member"
              />
              <Carousel.Caption>
                <h3>Mohamed El Bouhmi</h3>
                <p>Position and brief description of team member.</p>
                
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block"
                src={teamMember4}
                alt="Fourth team member"
              />
              <Carousel.Caption>
                <h3>Hamid Bouayadi</h3>
                <p>Position and brief description of team member.</p>
              
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </section>


        {/* CONTACT SECTION  1*/}

        <h1 className="title text-uppercase">Team socials</h1>
        <section className="contact-section" id="contact">
          <div className="contact">
            <h1 className="title-sub text-uppercase">Mounim's socials</h1>
            <p className="text-black-50">Get in Touch</p>
            <div className="contact-info-upper-container">
              <div className="contact-info-container">
                <img
                  src={email}
                  alt="Email icon"
                  className="icon contact-icon email-icon"
                />
                <p><a href="mailto:mounimnadir7@gmail.com">Gmail</a></p>
              </div>
              <div className="contact-info-container">
                <img
                  src={linkedin}
                  alt="LinkedIn icon"
                  className="icon contact-icon"
                />
                <p><a href="https://www.linkedin.com/in/mounim-nadir-b6575b27a">LinkedIn</a></p>
              </div>
              <div className="contact-info-container">
                <img
                  src={twitter}
                  alt="Twitter icon"
                  className="icon contact-icon"
                />
                <p><a href="https://x.com/MounimNadir">X-Twitter</a></p>
              </div>
            </div>
          </div>
        </section>
    {/* CONTACT SECTION  2*/}
        <section className="contact-section" id="contact">
          <div className="contact">
            <h1 className="title text-uppercase">Abdelaziz's socials</h1>
            <p className="text-black-50">Get in Touch</p>
            <div className="contact-info-upper-container">
              <div className="contact-info-container">
                <img
                  src={email}
                  alt="Email icon"
                  className="icon contact-icon email-icon"
                />
                <p><a href="mailto:Bouayadihamid@gmail.com">Gmail</a></p>
              </div>
              <div className="contact-info-container">
                <img
                  src={linkedin}
                  alt="LinkedIn icon"
                  className="icon contact-icon"
                />
                <p><a href="https://www.linkedin.com/in/mounim-nadir-b6575b27a">LinkedIn</a></p>
              </div>
              <div className="contact-info-container">
                <img
                  src={twitter}
                  alt="Twitter icon"
                  className="icon contact-icon"
                />
                <p><a href="https://twitter.com/AbdelKhouda">X-Twitter</a></p>
              </div>
            </div>
          </div>
        </section>
        {/* CONTACT SECTION  3*/}
        <section className="contact-section" id="contact">
          <div className="contact">
            <h1 className="title text-uppercase">Mohammed's socials</h1>
            <p className="text-black-50">Get in Touch</p>
            <div className="contact-info-upper-container">
              <div className="contact-info-container">
                <img
                  src={email}
                  alt="Email icon"
                  className="icon contact-icon email-icon"
                />
                <p><a href="mailto:Bouayadihamid@gmail.com">Gmail</a></p>
              </div>
              <div className="contact-info-container">
                <img
                  src={linkedin}
                  alt="LinkedIn icon"
                  className="icon contact-icon"
                />
                <p><a href="https://www.linkedin.com/in/mounim-nadir-b6575b27a">LinkedIn</a></p>
              </div>
              <div className="contact-info-container">
                <img
                  src={twitter}
                  alt="Twitter icon"
                  className="icon contact-icon"
                />
                <p><a href="https://twitter.com/AbdelKhouda">X-Twitter</a></p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION  4*/}
        <section className="contact-section" id="contact">
          <div className="contact">
            <h1 className="title text-uppercase"> Hamid's socials</h1>
            <p className="text-black-50">Get in Touch</p>
            <div className="contact-info-upper-container">
              <div className="contact-info-container">
                <img
                  src={email}
                  alt="Email icon"
                  className="icon contact-icon email-icon"
                />
                <p><a href="mailto:Bouayadihamid@gmail.com">Gmail</a></p>
              </div>
              <div className="contact-info-container">
                <img
                  src={linkedin}
                  alt="LinkedIn icon"
                  className="icon contact-icon"
                />
                <p><a href="https://www.linkedin.com/in/mounim-nadir-b6575b27a">LinkedIn</a></p>
              </div>
              <div className="contact-info-container">
                <img
                  src={twitter}
                  alt="Twitter icon"
                  className="icon contact-icon"
                />
                <p><a href="https://twitter.com/AbdelKhouda">X-Twitter</a></p>
              </div>
            </div>
          </div>
        </section>
        
  </>
  )
}

function Main() {
  const [logged]=useAuth()
  return (
      <div>
      {logged?<LoggedInHome/>:<LoggedOutHome/>}
      </div>
  );
}

export default Main;
