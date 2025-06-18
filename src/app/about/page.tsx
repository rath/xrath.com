export default function AboutPage() {
  return (
    <div className="min-h-screen py-20 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">
            About Me
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Crafting digital experiences through code, curiosity, and continuous learning.
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-16">
          {/* Introduction */}
          <section className="prose prose-lg max-w-none">
            <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-foreground/10">
              <h2 className="text-2xl font-bold gradient-text mb-6">Philosophy</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Technology is not just about solving problems—it's about understanding human nature, 
                anticipating needs that haven't been articulated yet, and creating connections between 
                ideas that seem unrelated. In my journey through software engineering, I've learned that 
                the most profound solutions often emerge from the intersection of technical excellence 
                and genuine empathy.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Every line of code carries intention. Every system design reflects a worldview. 
                I believe in building software that doesn't just work, but that feels inevitable—
                as if it had always existed, waiting to be discovered.
              </p>
            </div>
          </section>

          {/* Journey */}
          <section>
            <h2 className="text-2xl font-bold gradient-text mb-8">My Journey</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-foreground/10 card-hover">
                <h3 className="text-xl font-semibold mb-4">Present</h3>
                <p className="text-foreground/70 leading-relaxed mb-4">
                  Currently based in Berlin, I'm exploring the fascinating intersection of AI and human creativity. 
                  My latest project, <a href="https://mouton.told.me/en/" className="gradient-text font-medium hover:underline">Mouton</a>, 
                  is a personal diary application that uses AI to help people reflect more deeply on their daily experiences.
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  The rapid evolution of LLMs has opened up possibilities that seemed like science fiction just a few years ago. 
                  I'm particularly interested in how these tools can augment human creativity rather than replace it.
                </p>
              </div>
              
              <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-foreground/10 card-hover">
                <h3 className="text-xl font-semibold mb-4">Foundation</h3>
                <p className="text-foreground/70 leading-relaxed mb-4">
                  My path began in 1999, during the early days of the internet when every website felt like 
                  a small miracle. I started with Java applets and EJBs, moved through the mobile revolution 
                  with Android, and witnessed the transformation of how we build and deploy software.
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  From building MSN Messenger clones that reached millions of users to optimizing AWS costs 
                  by hundreds of thousands of dollars, each project taught me that technology's true value 
                  lies in its ability to scale human potential.
                </p>
              </div>
            </div>
          </section>

          {/* Current Focus */}
          <section>
            <h2 className="text-2xl font-bold gradient-text mb-8">Current Focus</h2>
            <div className="bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 rounded-3xl p-8 border border-foreground/5">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-blue-700">AI Integration</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    Exploring how LLMs can enhance development workflows and create more intuitive user experiences.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-purple-700">Mobile Innovation</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    Building cross-platform applications with Flutter that feel native on every device.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-pink-700">System Architecture</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    Designing scalable backend systems with Django and modern cloud infrastructure.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Approach */}
          <section>
            <h2 className="text-2xl font-bold gradient-text mb-8">Technical Approach</h2>
            <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-foreground/10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Principles</h3>
                  <ul className="space-y-3 text-foreground/70">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Simplicity over complexity—the best solutions are often the most elegant ones</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Performance matters, but not at the cost of maintainability</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Code should tell a story that future developers can easily follow</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Tools & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'Django', 'Flutter', 'TypeScript', 'React', 'AWS', 'PostgreSQL', 'Rust'].map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Personal */}
          <section>
            <h2 className="text-2xl font-bold gradient-text mb-8">Beyond Code</h2>
            <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-foreground/10">
              <p className="text-foreground/70 leading-relaxed mb-4">
                When I'm not writing code, I find myself drawn to the patterns that exist everywhere—
                in music, in language, in the way cities grow organically over time. These observations 
                often find their way back into my technical work, informing how I think about user 
                interfaces, system architecture, and the flow of data.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                Living in Berlin has been a constant reminder that the best ideas often emerge from 
                the collision of different perspectives and cultures. It's a mindset I try to bring 
                to every project—always asking: what am I not seeing? What assumptions am I making? 
                How can this be better?
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="text-center">
            <div className="bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 rounded-3xl p-8">
              <h2 className="text-2xl font-bold gradient-text mb-4">Let's Connect</h2>
              <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
                Interested in collaborating on something meaningful? I'm always open to thoughtful 
                conversations about technology, design, and the future we're building together.
              </p>
              <a
                href="mailto:rath@told.me"
                className="inline-flex items-center px-6 py-3 text-white rounded-2xl gradient-primary hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send me a message
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}