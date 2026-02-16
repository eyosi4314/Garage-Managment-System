//  import .env file
const api_url = import.meta.env.VITE_API_URL;
import React, { useEffect, useState } from "react";
import img1 from "../../../Assets/img/Gif.gif";
import img2 from "../../../Assets/img/10001.jpg";
function ServicePage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${api_url}/api/news`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBlogs(data); // Adjust according to the structure of your API response
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);
  console.log(blogs);
  return (
    <>
      {/* <HeaderPage /> */}
      <div
        className="ltn__breadcrumb-area ltn__breadcrumb-area-2 ltn__breadcrumb-color-white bg-overlay-theme-blue-90 bg-image"
        style={{
          backgroundImage: `url(${img2})`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="ltn__breadcrumb-inner ltn__breadcrumb-inner-2 justify-content-between">
                <div className="section-title-area ltn__section-title-2">
                  <h6 className="section-subtitle ltn__secondary-color">
                    // Welcome to our company
                  </h6>
                  <h1
                    className="section-title white-color"
                    style={{ color: "white" }}
                  >
                    What We Do
                  </h1>
                </div>
                <div className="ltn__breadcrumb-list">
                  <ul>
                    <li>
                      <a href="index.html">Home</a>
                    </li>
                    <li>Contact</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ltn__about-us-area pb-115">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 align-self-center">
              <div className="about-us-img-wrap ltn__img-shape-left  about-img-left">
                <img src={img1} alt="Image" />
              </div>
            </div>
            <div className="col-lg-7 align-self-center">
              <div className="about-us-info-wrap">
                <div className="section-title-area ltn__section-title-2">
                  <h6 className="section-subtitle ltn__secondary-color">
                    // RELIABLE SERVICES
                  </h6>
                  <h1 className="section-title">
                    We are Qualified & Professional<span>.</span>
                  </h1>
                  <p>
                    At [Company Name], we take pride in delivering top-quality
                    services with a team of certified professionals. Our
                    commitment to excellence ensures that every project is
                    completed to the highest standards.
                  </p>
                </div>
                <div className="about-us-info-wrap-inner about-us-info-devide">
                  <p>
                    With years of experience in the industry, we are equipped to
                    handle a wide range of services tailored to meet your needs.
                    Whether you're looking for expert advice, hands-on support,
                    or the latest in technology solutions, we've got you
                    covered. Our team works around the clock to provide seamless
                    service that you can count on.
                  </p>
                  <div className="list-item-with-icon">
                    <ul>
                      <li>
                        <a href="contact.html">24/7 Online Support</a>
                      </li>
                      <li>
                        <a href="team.html">Expert Team</a>
                      </li>
                      <li>
                        <a href="service-details.html">
                          State-of-the-Art Equipment
                        </a>
                      </li>
                      <li>
                        <a href="shop.html">Extensive Product Range</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ltn__service-area section-bg-1 pt-115 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title-area ltn__section-title-2 text-center">
                <h6 className="section-subtitle ltn__secondary-color">
                  // Service
                </h6>
                <h1 className="section-title">
                  What We Do<span>.</span>
                </h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="ltn__service-item-2 white-bg">
                <div className="service-item-icon">
                  <i className="icon-maintenance-1"></i>
                </div>
                <div className="service-item-brief">
                  <h6 className="ltn__secondary-color">// Tire and wheel</h6>
                  <h3>
                    <a href="service-details.html">
                      There are many variations of passages of Lorem.
                    </a>
                  </h3>
                  <ul>
                    <li>
                      <span>//</span> Tire puncher with cleaning
                    </li>
                    <li>
                      <span>//</span> Tire Customization
                    </li>
                    <li>
                      <span>//</span> Tire check & fixing
                    </li>
                    <li>
                      <span>//</span> Tire change & color
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="ltn__service-item-2 white-bg">
                <div className="service-item-icon">
                  <i className="icon-mechanic"></i>
                </div>
                <div className="service-item-brief">
                  <h6 className="ltn__secondary-color">
                    // Drivability problems
                  </h6>
                  <h3>
                    <a href="service-details.html">
                      majority have suffered alteration in some form.
                    </a>
                  </h3>
                  <ul>
                    <li>
                      <span>//</span> Tire puncher with cleaning
                    </li>
                    <li>
                      <span>//</span> Tire Customization
                    </li>
                    <li>
                      <span>//</span> Tire check & fixing
                    </li>
                    <li>
                      <span>//</span> Tire change & color
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="ltn__service-item-2 white-bg">
                <div className="service-item-icon">
                  <i className="icon-car-parts-3"></i>
                </div>
                <div className="service-item-brief">
                  <h6 className="ltn__secondary-color">
                    // Automotive filters
                  </h6>
                  <h3>
                    <a href="service-details.html">
                      Excellece in automotive services since 1996.
                    </a>
                  </h3>
                  <ul>
                    <li>
                      <span>//</span> Tire puncher with cleaning
                    </li>
                    <li>
                      <span>//</span> Tire Customization
                    </li>
                    <li>
                      <span>//</span> Tire check & fixing
                    </li>
                    <li>
                      <span>//</span> Tire change & color
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="ltn__service-item-2 white-bg">
                <div className="service-item-icon">
                  <i className="icon-car-parts"></i>
                </div>
                <div className="service-item-brief">
                  <h6 className="ltn__secondary-color">// Tire and wheel</h6>
                  <h3>
                    <a href="service-details.html">
                      There are many variations of passages of Lorem.
                    </a>
                  </h3>
                  <ul>
                    <li>
                      <span>//</span> Tire puncher with cleaning
                    </li>
                    <li>
                      <span>//</span> Tire Customization
                    </li>
                    <li>
                      <span>//</span> Tire check & fixing
                    </li>
                    <li>
                      <span>//</span> Tire change & color
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="ltn__service-item-2 white-bg">
                <div className="service-item-icon">
                  <i className="icon-repair"></i>
                </div>
                <div className="service-item-brief">
                  <h6 className="ltn__secondary-color">
                    // Drivability problems
                  </h6>
                  <h3>
                    <a href="service-details.html">
                      majority have suffered alteration in some form.
                    </a>
                  </h3>
                  <ul>
                    <li>
                      <span>//</span> Tire puncher with cleaning
                    </li>
                    <li>
                      <span>//</span> Tire Customization
                    </li>
                    <li>
                      <span>//</span> Tire check & fixing
                    </li>
                    <li>
                      <span>//</span> Tire change & color
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="ltn__service-item-2 white-bg">
                <div className="service-item-icon">
                  <i className="icon-automobile"></i>
                </div>
                <div className="service-item-brief">
                  <h6 className="ltn__secondary-color">
                    // Automotive filters
                  </h6>
                  <h3>
                    <a href="service-details.html">
                      Excellece in automotive services since 1996.
                    </a>
                  </h3>
                  <ul>
                    <li>
                      <span>//</span> Tire puncher with cleaning
                    </li>
                    <li>
                      <span>//</span> Tire Customization
                    </li>
                    <li>
                      <span>//</span> Tire check & fixing
                    </li>
                    <li>
                      <span>//</span> Tire change & color
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ltn__blog-area pt-115 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title-area ltn__section-title-2 text-center">
                <h6 className="section-subtitle ltn__secondary-color">
                  // blog & insights
                </h6>
                <h1 className="section-title">
                  News Feeds<span>.</span>
                </h1>
              </div>
            </div>
          </div>
          <div className="row ltn__blog-slider-one-active slick-arrow-1">
            {blogs.length === 0 ? (
              <div className="col-lg-12">
                <div className="ltn__blog-item">
                  <div className="ltn__blog-brief">
                    <p>Loading blogs...</p>
                  </div>
                </div>
              </div>
            ) : (
              blogs.map((blog) => (
                <div className="col-lg-12" key={blog.id}>
                  <div
                    className="ltn__blog-item ltn__blog-item-4 bg-image"
                    style={{ backgroundImage: `url(${blog.image})` }} // Use the URL from the blog object
                  >
                    <div className="ltn__blog-brief">
                      <div className="ltn__blog-meta">
                        <ul>
                          <li className="ltn__blog-author">
                            <a href="#">
                              <i className="far fa-user"></i>by: {blog.author}
                            </a>
                          </li>
                          <li className="ltn__blog-tags">
                            <a href="#">
                              <i className="fas fa-tags"></i>
                              {blog.category}
                            </a>
                          </li>
                        </ul>
                      </div>
                      <h3 className="ltn__blog-title">
                        <a href={`/blog-details/${blog.id}`}>{blog.title}</a>
                      </h3>
                      <p>{blog.summary}</p>
                      <div className="ltn__blog-meta-btn">
                        <div className="ltn__blog-meta">
                          <ul>
                            <li className="ltn__blog-date">
                              <i className="far fa-calendar-alt"></i>{" "}
                              {new Date(blog.date).toLocaleDateString()}
                            </li>
                          </ul>
                        </div>
                        <div className="ltn__blog-btn">
                          <a href={`/blog-details/${blog.id}`}>Read more</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ServicePage;
