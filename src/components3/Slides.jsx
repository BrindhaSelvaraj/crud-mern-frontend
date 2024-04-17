import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Slides = () => {
    
    /**using the react-responsive-carousel module to easily create a slide show of various images faded in the background 
    and different text to convery various messages to potential users.**/
    return(
        <section id='carosel'>
            <Carousel autoPlay infiniteLoop showThumbs={false} interval={6000} stopOnHover={false}>
                <div className='img-container'>
                    <img src='/images/home/task1.jpg' alt='tasks' />
                            <section className='home-sectionBackground-Plain'></section>
                            <section className='sectionCarousels'>
                                <p>Prioritize and Plan</p>
                                <h2>Keep focus on your priorities</h2>
                                <p>Plan with ease knowing you have visibility into your project details and how they align to your daily goals. Never loose sight of what's important.</p>
                                <h3>Accelerate your productivity with task management.</h3>
                            </section>
                </div>
                <div className='img-container'>
                    <img src='/images/home/task2.jpg' alt='tasks' />
                    <section className='home-sectionBackground'></section>
                            <section className='sectionCarousels'>
                                <p>Task Schedule</p>
                                <h2>Reduce unnecessary anxiety in your routine</h2>
                                <p>Making and following a task schedule reduces anxiety. As you check off items on your “to-do” list, you can see that you are making tangible progress.</p>
                                <h3>With taskBit, you prepare for maximum productivity</h3>
                            </section>
                </div>
                <div className='img-container'>
                    <img src='/images/home/task3.jpg' alt='tasks' />
                    <section className='home-sectionBackground'></section>
                            <section className='sectionCarousels'>
                                <p>Time Management</p>
                                <h2>Planning and controlling how much time to spend on specific activities</h2>
                                <p>Good time management enables an individual to complete more in a shorter period of time, lowers stress, and leads to career success.</p>
                                <h3>Accelerate your productivity with Time management.</h3>
                            </section>
                </div>
                <div className='img-container'>
                    <img src='/images/home/task4.jpg' alt='tasks' />
                    <section className='home-sectionBackground'></section>
                            <section className='sectionCarousels'>
                                <p>Set goals correctly</p>
                                <h2>Use the SMART approach in managing your projects</h2>
                                <p>Set goals that are achievable and measurable. Use the SMART method when setting goals. In essence, make sure the goals you set are Specific, Measurable, Attainable, Relevant, and Timely.</p>
                                <h3>All you need is what we provide</h3>
                            </section>
                </div>
                <div className='img-container'>
                    <img src='/images/home/task5.jpg' alt='tasks' />
                    <section className='home-sectionBackground'></section>
                            <section className='sectionCarousels'>
                                <p>More opportunities</p>
                                <h2>Good time management skills</h2>
                                <p>Managing time well leads to more opportunities and less time wasted on trivial activities. </p>
                                <h3>With our task management app, you keep track of how your time is spent</h3>
                            </section>
                </div>
                <div className='img-container'>
                    <img src='/images/home/task6.jpg' alt='tasks' />
                    <section className='home-sectionBackground'></section>
                            <section className='sectionCarousels'>
                                <p>Prioritize wisely</p>
                                <h2>Keep focus on your priorities</h2>
                                <p>Prioritize tasks based on importance and urgency. For example, look at your daily tasks and determine which are: Important and Urgent or Important but not Urgent</p>
                                <h3>Accelerate your productivity with task management.</h3>
                            </section>
                </div>
            </Carousel>
        </section>
    )
}

export default Slides