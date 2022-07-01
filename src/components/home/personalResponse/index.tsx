import Link from "next/link";
import style from "./style.module.scss";

export default function HomePersonalResponse() {
  const w = (path) => `/works/${path}`;

  return (
    <section className={style.pr}>
      <p>
        Since Primary 3, I was intrigued by the magic behind robots and computer
        programs, enabling the automation of a dull repertoire of tasks or the
        ability to do the previously unthinkable. Now, what used to be magic is
        magically simple—programming through critical thinking. As I grew older,
        my innate drive to solve real-world problems through technology
        motivated me to expand further into areas such as robotics with Arduino
        and Raspberry Pi, competitive programming with Python and C++, and web
        development in JavaScript React.js and app development with Swift and
        React Native. In my Co-curricular Activity (CCA), Robotics Club, I
        always strive to find novel ways to better myself and do well in
        competitions by staying resilient and learning from setbacks. In{" "}
        <Link href={w("robocup-2021")}>RoboCup 2021</Link>, despite my
        team&apos;s line tracing algorithm not being most optimal due to little
        time for testing and programming, we returned to school whenever
        possible and innovated creative solutions, eventually pulling through
        with 2nd Place. My motivation and enthusiasm to keep up with new trends
        in technology also allow me to excel in the fast-paced information
        technology (ICT) field. In my ICT Talent Development Programme, SST Inc,
        I strive to pick up new skills through projects that solve real-world
        problems in the community, such as developing a React.js web application
        to more efficiently take attendance for club members.
      </p>
      <p>
        In robotics and competitive programming competitions, many inevitable
        hurdles are bound to manifest. However, this does not deter me, for my
        resourcefulness and natural curiosity to learn more allows me to
        persevere in solving challenges by picking up new skills. For example, I
        would use online learning resources like Udemy or ask my experienced
        seniors to expand my knowledge. In the{" "}
        <Link href={w("nrc-2021")}>NRC 2021 Future Engineers Category</Link>, I
        learned to utilise OpenCV and TensorFlow to program the robot to detect
        objects and react accordingly using Computer Vision (CV) through machine
        learning. With the new abilities equipped, critical and creative
        thinking allows me to develop innovative strategies and ideas to tackle
        problems. For instance, using Python skills I picked up online, my team
        and I created a prototype of a tour glasses that won 1st Runner-up at
        the <Link href={w("splash-2021")}>Splash Awards 2021</Link> and
        Champions at my school&apos;s annual{" "}
        <Link href={w("cm-innofest-2020")}>
          ChangeMakers InnoFest Challenge 2020
        </Link>
        . Despite facing many impediments through the engineering process, such
        as each of us specialising in a different area and not all of us being
        technically equipped, I had to communicate my ideas with others
        effectively to overcome struggles efficiently. Ultimately, we adapted
        well to our situation and stayed determined, proving the effort
        worthwhile.
      </p>
      <p>
        As a leader in both my Robotics CCA and SST Inc TDP, I strive to do my
        best to serve my community. For instance, I used my skills to improve
        attendance-taking in SST Inc and developed a website to publicise my
        CCA. In both clubs, I also started and managed a Notion page for the
        ExCo and respective committees to keep track of the timeline, students,
        meeting minutes, publicity or internal projects. As President of SST
        Inc, I led the ExCo in organising bonding activities such as INCamp, a
        one-day experience for members of the club to bond through various
        activities, and training lessons for juniors to learn from seniors.
      </p>
    </section>
  );
}
