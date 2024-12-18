import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";


const defaultContactForm ={
  username: "",
  email: "",
  message: "",
}
export const Contact = () => {
  const [contact, setContact] = useState(defaultContactForm);

  // get user data from auth store
  const [userData,setUserData] = useState(true)
  const{user ,API}  = useAuth();
  //this code is used to get data at contact page by default for complaints and all
  useEffect(() => {
    if (userData && user) {
      setContact({
        username: user.username || "",
        email: user.email || "",
        message: "",
      });
      setUserData(false);
    }
  }, [user, userData]);
  
  // lets tackle our handleInput
  const handleInput = (e) => {
    const { name, value } = e.target;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  // handle fomr getFormSubmissionInfo
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/api/form/contact`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify(contact),
      })
        if (response.ok) {
          setContact(defaultContactForm)
          const data = await response.json();
          console.log(data);
          alert("Form submitted successfully");
        }
    } catch (error) {
      console.log(error);
    }
    console.log(contact);
  };
  

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Contact Us</h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="we are always ready to help" />
          </div>

          {/* contact form content actual  */}
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="message">message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>

              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </section>
        </div>

        <section className="mb-3">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.39065745603!2d85.3353484!3d27.674318300000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19806e63fd13%3A0x9ea5930c087495b!2sHimalayan%20SIP!5e0!3m2!1sen!2snp!4v1732171111748!5m2!1sen!2snp"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </>
  );
};