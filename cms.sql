-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 17, 2021 at 08:21 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cms`
--

-- --------------------------------------------------------

--
-- Table structure for table `assignments`
--

CREATE TABLE `assignments` (
  `assignment_id` varchar(15) NOT NULL,
  `course_id` varchar(10) NOT NULL,
  `question` varchar(1000) NOT NULL,
  `max_marks` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assignments`
--

INSERT INTO `assignments` (`assignment_id`, `course_id`, `question`, `max_marks`) VALUES
('CS20031_02', 'CS20031', 'afasdsad', 10),
('CS2003_01', 'CS2003', 'Most of the time professors and teachers assign 300 word essay writing work to students to quantify their research skills, opinions, and knowledge. While 300 word essay seems to an easy task, however, that is not the case. Essay writing gets tough when you have a limit over the word count. You all know that an essay should be well researched and present the argument along with evidence. But when you get a short essay of 300 word, you need to have a skill of presenting your thoughts and ideas in a condensed manner.\n\nA short essay is a big challenge for most of the students.  Students have to present their opinions within a limit of 300 to 350 words. Such types of essays require a proper plan and deep research on the topic. You cannot write it vaguely, there should be precision in the essay writing work. There are some tips one can follow to build an excellent 300 word essay.\nTips to write a world-class 300 word essay\n300-word-essay\nUnderstand the essay prompt first', 10),
('IT2001_01', 'IT2001', 'This is IT assignment.', 10);

-- --------------------------------------------------------

--
-- Table structure for table `assignment_files`
--

CREATE TABLE `assignment_files` (
  `assignment_id` varchar(15) NOT NULL,
  `course_id` varchar(10) NOT NULL,
  `student_id` varchar(15) NOT NULL,
  `student_file` varchar(500) NOT NULL,
  `marks_obtained` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assignment_files`
--

INSERT INTO `assignment_files` (`assignment_id`, `course_id`, `student_id`, `student_file`, `marks_obtained`) VALUES
('CS20031_02', 'CS20031', '20BCS080', 'CS20031_02 - 20BCS080.pdf', 0),
('IT2001_01', 'IT2001', '20BCS080', 'IT2001_01 - 20BCS080.pdf', 0);

-- --------------------------------------------------------

--
-- Table structure for table `candidate_answers`
--

CREATE TABLE `candidate_answers` (
  `student_id` varchar(15) NOT NULL,
  `quiz_id` varchar(15) NOT NULL,
  `ques_id` varchar(15) NOT NULL,
  `opted_option` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `candidate_answers`
--

INSERT INTO `candidate_answers` (`student_id`, `quiz_id`, `ques_id`, `opted_option`) VALUES
('20BCS080', 'CS2003_01', 'CS2003_01_1', 'C'),
('20BCS080', 'CS2003_01', 'CS2003_01_2', 'D'),
('20BCS080', 'CS2003_01', 'CS2003_01_3', 'B');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `course_id` varchar(10) NOT NULL,
  `course_name` varchar(100) NOT NULL,
  `instructor_id` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`course_id`, `course_name`, `instructor_id`) VALUES
('CS2003', 'Database Management System', '20BCS080'),
('CS20031', 'ABC', '20BCS080'),
('Demo1', 'demo course', '20BCS080'),
('DS201', 'Data Science', '20BCS080'),
('IT2001', 'Data Structures and Algorithms', '20BCS080');

-- --------------------------------------------------------

--
-- Table structure for table `course_students`
--

CREATE TABLE `course_students` (
  `course_id` varchar(10) NOT NULL,
  `student_id` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course_students`
--

INSERT INTO `course_students` (`course_id`, `student_id`) VALUES
('CS2003', '20BCS080'),
('CS20031', '20BCS080'),
('Demo1', '20BCS080'),
('DS201', '20BCS080'),
('IT2001', '20BCS080');

-- --------------------------------------------------------

--
-- Table structure for table `instructors`
--

CREATE TABLE `instructors` (
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `roll_number` varchar(15) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `instructors`
--

INSERT INTO `instructors` (`first_name`, `last_name`, `email`, `roll_number`, `password`) VALUES
('Divyansh', 'Khetan', '20bcs080@iiitdmj.ac.in', '20BCS080', '$2b$10$1BPaBfDLAUfg8kkY58ets.hFJp5y4I7nSBRxYaFcz2It/DBPoUJFq');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `ques_id` varchar(15) NOT NULL,
  `quiz_id` varchar(15) NOT NULL,
  `question` varchar(500) DEFAULT NULL,
  `opt1` varchar(100) DEFAULT NULL,
  `opt2` varchar(100) DEFAULT NULL,
  `opt3` varchar(100) DEFAULT NULL,
  `opt4` varchar(100) DEFAULT NULL,
  `correct_opt` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`ques_id`, `quiz_id`, `question`, `opt1`, `opt2`, `opt3`, `opt4`, `correct_opt`) VALUES
('CS20031_01_1', 'CS20031_01', 'qwewqeq', 'qweqwe', 'qwewqe', 'qwewqe', 'qweqwe', 'B'),
('CS20031_01_2', 'CS20031_01', 'Q2 hai ye', 'qweqwe', 'qwewqe', 'qwewqe', 'qweqwe', 'B'),
('CS2003_01_1', 'CS2003_01', 'Question 1 tha idhar', 'op1', 'opB', 'opC', 'OPD', 'B'),
('CS2003_01_2', 'CS2003_01', 'Waah life ho to aisi kaun se saal me release hui thi', '1901', '1902`', '2001', '2002', 'D'),
('CS2003_01_3', 'CS2003_01', 'What is the rate of 1kg apple?', '100 rupya', '150 rupya', '200 rupya', '1000 rupya', 'B'),
('CS2003_03_1', 'CS2003_03', 'QUestion 1 ki question', '11', '22', '33', '44', 'B'),
('CS2003_03_2', 'CS2003_03', 'sadasdsd', 'sadasd', 'asd', 'asdasd', 'asdasda', 'A');

-- --------------------------------------------------------

--
-- Table structure for table `quizes`
--

CREATE TABLE `quizes` (
  `quiz_id` varchar(15) NOT NULL,
  `quiz_name` varchar(100) DEFAULT NULL,
  `course_id` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quizes`
--

INSERT INTO `quizes` (`quiz_id`, `quiz_name`, `course_id`) VALUES
('CS20031_01', 'abc', 'CS20031'),
('CS2003_01', 'Demo 1', 'CS2003'),
('CS2003_03', 'Demo 3', 'CS2003');

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `student_id` varchar(15) NOT NULL,
  `quiz_id` varchar(15) NOT NULL,
  `no_of_correct` int(11) DEFAULT NULL,
  `no_of_incorrect` int(11) DEFAULT NULL,
  `no_of_unanswered` int(11) DEFAULT NULL,
  `score` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `results`
--

INSERT INTO `results` (`student_id`, `quiz_id`, `no_of_correct`, `no_of_incorrect`, `no_of_unanswered`, `score`) VALUES
('20BCS080', 'CS2003_01', 2, 1, 7, 2);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `roll_number` varchar(15) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`roll_number`, `first_name`, `last_name`, `email`, `password`) VALUES
('20BCS012', 'Abhishek', 'Gupta', '20bcs012@iiitdmj.ac.in', '$2b$10$chzTW1/5dE4h/m7NZ55QtO5MGRTI4277Boe2pGruTw1GZ5znKqfAK'),
('20BCS067', 'Chirag', 'Mundhra', '20bcs067@iiitdmj.ac.in', '$2b$10$mX4SwN7rjLZMbCk6Mi5JC.TEWa8krT2JejcnwdmoPmSqDVgInahSu'),
('20BCS080', 'Divyansh', 'Khetan', '20bcs080@iiitdmj.ac.in', '$2b$10$/O5uFRKWX3rwByhGviWfYu4hq5Sj6KknbNOBdwe6CKN5JpK/qt59e');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`assignment_id`,`course_id`),
  ADD UNIQUE KEY `assignment_id` (`assignment_id`),
  ADD KEY `assignments_fk0` (`course_id`);

--
-- Indexes for table `assignment_files`
--
ALTER TABLE `assignment_files`
  ADD PRIMARY KEY (`assignment_id`,`student_id`),
  ADD KEY `assignment_files_fk1` (`student_id`),
  ADD KEY `course_id` (`course_id`) USING BTREE;

--
-- Indexes for table `candidate_answers`
--
ALTER TABLE `candidate_answers`
  ADD PRIMARY KEY (`student_id`,`quiz_id`,`ques_id`),
  ADD KEY `quiz_id` (`quiz_id`),
  ADD KEY `ques_id` (`ques_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`),
  ADD UNIQUE KEY `course_id` (`course_id`),
  ADD KEY `courses_fk0` (`instructor_id`);

--
-- Indexes for table `course_students`
--
ALTER TABLE `course_students`
  ADD PRIMARY KEY (`course_id`,`student_id`),
  ADD KEY `course_students_fk1` (`student_id`);

--
-- Indexes for table `instructors`
--
ALTER TABLE `instructors`
  ADD PRIMARY KEY (`roll_number`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `roll_number` (`roll_number`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`ques_id`);

--
-- Indexes for table `quizes`
--
ALTER TABLE `quizes`
  ADD PRIMARY KEY (`quiz_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`student_id`,`quiz_id`),
  ADD KEY `quiz_id` (`quiz_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`roll_number`),
  ADD UNIQUE KEY `roll_number` (`roll_number`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assignments`
--
ALTER TABLE `assignments`
  ADD CONSTRAINT `assignments_fk0` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

--
-- Constraints for table `assignment_files`
--
ALTER TABLE `assignment_files`
  ADD CONSTRAINT `assignment_files_fk0` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`assignment_id`),
  ADD CONSTRAINT `assignment_files_fk1` FOREIGN KEY (`student_id`) REFERENCES `students` (`roll_number`),
  ADD CONSTRAINT `assignment_files_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

--
-- Constraints for table `candidate_answers`
--
ALTER TABLE `candidate_answers`
  ADD CONSTRAINT `candidate_answers_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`roll_number`),
  ADD CONSTRAINT `candidate_answers_ibfk_2` FOREIGN KEY (`quiz_id`) REFERENCES `quizes` (`quiz_id`),
  ADD CONSTRAINT `candidate_answers_ibfk_3` FOREIGN KEY (`ques_id`) REFERENCES `questions` (`ques_id`);

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_fk0` FOREIGN KEY (`instructor_id`) REFERENCES `instructors` (`roll_number`);

--
-- Constraints for table `course_students`
--
ALTER TABLE `course_students`
  ADD CONSTRAINT `course_students_fk0` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  ADD CONSTRAINT `course_students_fk1` FOREIGN KEY (`student_id`) REFERENCES `students` (`roll_number`);

--
-- Constraints for table `quizes`
--
ALTER TABLE `quizes`
  ADD CONSTRAINT `quizes_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

--
-- Constraints for table `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `results_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`roll_number`),
  ADD CONSTRAINT `results_ibfk_2` FOREIGN KEY (`quiz_id`) REFERENCES `quizes` (`quiz_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
