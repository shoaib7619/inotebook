import React from 'react'

const About = () =>{ 
  
  return (
    <div className='container'>
    <h1 className='my-3'  >About us</h1>
    <div className="accordion" id="accordionExample" >
    <div className="accordion-item">
    <h2 className="accordion-header" id="headingOne">
    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" >
        <strong>iNotebook</strong> 
    </button>
    </h2>
    <div id="collapseOne"  className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
    <div className="accordion-body" >
      To use iNotebook first of all you need to  signin with your email. Your personal information must be secure and don't share with third party. After login to iNotebook you can be able to save your notes.You can update and delete your existing notes and your notes are totally secured. Nobody can see the notes of any other user.
    </div>
    </div>
</div>
<div className="accordion-item">
    <h2 className="accordion-header" id="headingTwo">
    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
    <strong>Free use </strong>
    </button>
    </h2>
    <div id="collapseTwo"   className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
    <div className="accordion-body" >
              You can use this website without any subscription.
    </div>
    </div>
</div>
<div className="accordion-item" >
    <h2 className="accordion-header" id="headingThree" >
    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
       <strong>Developed by </strong>  
    </button>
    </h2>
    <div id="collapseThree"  className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
    <div className="accordion-body">
    <strong>Muhammad Shaoib</strong> 
    </div>
    </div>
</div>
</div>
    </div>
)
}
  
export default About
