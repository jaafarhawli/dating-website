-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 05, 2022 at 04:16 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `data`
--

-- --------------------------------------------------------

--
-- Table structure for table `blocks`
--

CREATE TABLE `blocks` (
  `blocking_user_id` int(10) UNSIGNED NOT NULL,
  `blocked_user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blocks`
--

INSERT INTO `blocks` (`blocking_user_id`, `blocked_user_id`, `created_at`, `updated_at`) VALUES
(1, 3, '2022-10-04 10:46:49', '2022-10-04 10:46:49'),
(2, 3, '2022-10-04 16:37:18', '2022-10-04 16:37:18'),
(2, 7, '2022-10-04 16:39:28', '2022-10-04 16:39:28'),
(1, 7, '2022-10-04 18:50:48', '2022-10-04 18:50:48'),
(1, 2, '2022-10-04 20:26:12', '2022-10-04 20:26:12');

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `sender_user_id` int(10) UNSIGNED NOT NULL,
  `sent_to_user_id` int(10) UNSIGNED NOT NULL,
  `message` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`sender_user_id`, `sent_to_user_id`, `message`, `date`, `created_at`, `updated_at`) VALUES
(1, 2, 'Hello', '2022-10-04 02:10:19', '2022-10-04 11:10:19', '2022-10-04 11:10:19'),
(2, 1, 'Hello', '2022-10-04 02:10:30', '2022-10-04 11:10:30', '2022-10-04 11:10:30'),
(1, 2, 'Hello', '2022-10-04 09:33:28', '2022-10-04 18:33:28', '2022-10-04 18:33:28'),
(1, 2, 'Hello', '2022-10-04 09:37:25', '2022-10-04 18:37:25', '2022-10-04 18:37:25'),
(1, 2, 'Hiii', '2022-10-04 09:37:32', '2022-10-04 18:37:32', '2022-10-04 18:37:32'),
(1, 2, 'siso', '2022-10-04 09:42:17', '2022-10-04 18:42:17', '2022-10-04 18:42:17'),
(1, 2, 'supp', '2022-10-04 09:43:05', '2022-10-04 18:43:05', '2022-10-04 18:43:05'),
(1, 2, 'Psst', '2022-10-04 09:50:34', '2022-10-04 18:50:34', '2022-10-04 18:50:34'),
(1, 6, 'Hello', '2022-10-04 09:52:28', '2022-10-04 18:52:28', '2022-10-04 18:52:28'),
(1, 14, 'Sup', '2022-10-04 10:45:45', '2022-10-04 19:45:45', '2022-10-04 19:45:45'),
(14, 1, 'Sup', '2022-10-04 10:46:55', '2022-10-04 19:46:55', '2022-10-04 19:46:55'),
(4, 9, 'bro', '2022-10-05 12:22:41', '2022-10-04 21:22:41', '2022-10-04 21:22:41'),
(15, 8, 'kifak', '2022-10-05 01:14:08', '2022-10-04 22:14:08', '2022-10-04 22:14:08'),
(8, 15, 'tamem', '2022-10-05 01:17:32', '2022-10-04 22:17:32', '2022-10-04 22:17:32');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `liking_user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`user_id`, `liking_user_id`, `created_at`, `updated_at`) VALUES
(1, 2, '2022-10-04 11:04:06', '2022-10-04 11:04:06'),
(1, 3, '2022-10-04 11:05:00', '2022-10-04 11:05:00'),
(2, 4, '2022-10-04 16:31:08', '2022-10-04 16:31:08'),
(2, 3, '2022-10-04 16:33:47', '2022-10-04 16:33:47'),
(2, 6, '2022-10-04 16:49:52', '2022-10-04 16:49:52'),
(2, 12, '2022-10-04 16:50:45', '2022-10-04 16:50:45'),
(3, 11, '2022-10-04 18:19:45', '2022-10-04 18:19:45'),
(15, 11, '2022-10-04 22:13:43', '2022-10-04 22:13:43');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prefered_gender` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bio` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `private_account` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `location`, `gender`, `prefered_gender`, `bio`, `private_account`, `profile_url`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'jason3', 'jason3@hotmail.com', '$2y$10$Lq5MbM9YeEAVCXk8FQa7r.Egdb3qhcEMMskULZ3DTaaroWuIqy1GO', 'beirut', 'male', 'female', 'hello world', 'Yes', 'C:/xampp/htdocs/news-website-backend/images/6340123.jpg', NULL, '2022-10-04 09:22:43', '2022-10-04 21:15:02'),
(2, 'jaafar', 'jaafar@hotmail.com', '$2y$10$O/tnxwcOzRYyYk8zdNSdyOyDnK6CSqYT7Efk/KDKUllEHuPawntOW', 'beirut', 'male', 'female', 'Mamma mia', 'no', 'C:/xampp/htdocs/news-website-backend/images/6340123.jpg', NULL, '2022-10-04 09:23:13', '2022-10-04 17:26:09'),
(3, 'mira', 'mira@hotmail.com', '$2y$10$xBRBnllq15mNFNuOACal/e3sNsl1Ltu2wBX5sedIJzoHHNn639PGW', 'beirut', 'female', 'male', NULL, 'no', 'C:/xampp/htdocs/news-website-backend/images/6340123.jpg', NULL, '2022-10-04 09:41:40', '2022-10-04 09:41:40'),
(4, 'nabiha', 'nabiha@hotmail.com', '$2y$10$/PayZfguUYo2tX.BeQOXAe7.q9mtZ.X5nJOzY7IHbEE/FltO7TDfy', 'beirut', 'female', 'male', NULL, 'no', 'C:/xampp/htdocs/news-website-backend/images/6340123.jpg', NULL, '2022-10-04 09:42:07', '2022-10-04 09:42:07'),
(5, 'rami', 'rami@hotmail.com', '$2y$10$vZ8mpq4DgWzXLZ/cCoCmru6UJB3h/hves5Qnn/M/dAttFFawn/x4G', 'zahle', 'male', 'female', 'null', 'Yes', 'C:/xampp/htdocs/news-website-backend/images/6340123.jpg', NULL, '2022-10-04 09:42:45', '2022-10-04 21:06:30'),
(6, 'sara', 'sara@hotmail.com', '$2y$10$0LeIU03qwr9IEJAC9QeLrO0KAbk6Mi64c4jk5oy8enq9r/YTRvZlq', 'zahle', 'female', 'male', 'null', 'No', 'C:/xampp/htdocs/news-website-backend/images/6340123.jpg', NULL, '2022-10-04 09:43:24', '2022-10-04 23:12:30'),
(7, 'lara', 'lara@hotmail.com', '$2y$10$sXJx/DIf05hQ832cgfe3XORxNQRd8pRmFp.EwkX8V5aT/kXCW7Jlm', 'tyre', 'female', 'male', NULL, 'no', 'C:/xampp/htdocs/news-website-backend/images/6340123.jpg', NULL, '2022-10-04 09:43:53', '2022-10-04 09:43:53'),
(8, 'maher', 'maher@hotmail.com', '$2y$10$5U6G2yzQhF.QHRov8PnHrOxbU513Bp7IKbYN6QmvJQSn12T7dh01a', 'tyre', 'male', 'female', NULL, 'no', 'C:/xampp/htdocs/news-website-backend/images/6340123.jpg', NULL, '2022-10-04 09:45:00', '2022-10-04 09:45:00'),
(9, 'jason', 'jason@hotmail.com', '$2y$10$BPEqAft48G6z09hAWODgf.pGumTB7q0tSsN.FneWwTsCD/NtdIKpi', 'tyre', 'male', 'female', NULL, 'no', 'C:/xampp/htdocs/news-website-backend/images/6340123.jpg', NULL, '2022-10-04 09:52:33', '2022-10-04 09:52:33'),
(10, 'jason2', 'jason2@hotmail.com', '$2y$10$v9zdk9WyTS2hdLn.1tepieU1h6Ij8xOLKpUkL7kfN/KNVAnQ6VA6W', 'beirut', 'male', 'female', 'null', 'No', 'C:/xampp/htdocs/news-website-backend/images/6340123.jpg', NULL, '2022-10-04 13:05:46', '2022-10-04 21:19:52'),
(11, 'jamil', 'jamil@hotmail.com', '$2y$10$VJR7VJkUXnDzQdEYvclTJeiC3FvmBL7dxyhOdSvo3CW94dCEcK8ja', 'beirut', 'male', 'female', NULL, 'no', 'C:/xampp/htdocs/news-website-backend/images/6340123.jpg', NULL, '2022-10-04 13:05:54', '2022-10-04 13:05:54'),
(12, 'samira', 'samira@hotmail.com', '$2y$10$VujvpID/.xBSzF5SPfi0Ieylqw9vLtkeXKWsBHpZi3ppGIHOCsShC', 'tyre', 'female', 'male', NULL, 'no', 'C:/xampp/htdocs/news-website-backend/images/6340123.jpg', NULL, '2022-10-04 13:14:03', '2022-10-04 13:14:03'),
(14, 'maya', 'maya@hotmail.com', '$2y$10$oYfhJFcJZBuqfijJC31ZnuD2kdXLdka3S8fQvmg14MSjtxCQfthL.', 'tyre', 'female', 'male', NULL, 'no', 'C:/xampp/htdocs/news-website-backend/images/6340123.jpg', NULL, '2022-10-04 13:59:43', '2022-10-04 13:59:43'),
(15, 'lama', 'lama@hotmail.com', '$2y$10$q4UJnF8a9WfXQJFSUpWh7euGnYmuyRE9ccuiEKuJuER9nqVh0tuwa', 'tyre', 'female', 'male', 'Mamma mia', 'No', NULL, NULL, '2022-10-04 22:12:32', '2022-10-04 22:14:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blocks`
--
ALTER TABLE `blocks`
  ADD KEY `blocks_blocking_user_id_foreign` (`blocking_user_id`),
  ADD KEY `blocks_blocked_user_id_foreign` (`blocked_user_id`);

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD KEY `chats_sender_user_id_foreign` (`sender_user_id`),
  ADD KEY `chats_sent_to_user_id_foreign` (`sent_to_user_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD KEY `likes_user_id_foreign` (`user_id`),
  ADD KEY `likes_liking_user_id_foreign` (`liking_user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blocks`
--
ALTER TABLE `blocks`
  ADD CONSTRAINT `blocks_blocked_user_id_foreign` FOREIGN KEY (`blocked_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `blocks_blocking_user_id_foreign` FOREIGN KEY (`blocking_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `chats_sender_user_id_foreign` FOREIGN KEY (`sender_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chats_sent_to_user_id_foreign` FOREIGN KEY (`sent_to_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_liking_user_id_foreign` FOREIGN KEY (`liking_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `likes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
