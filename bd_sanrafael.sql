-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-02-2022 a las 20:51:03
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_sanrafael`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id` int(12) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `descripcion` varchar(300) NOT NULL,
  `duracion` varchar(24) NOT NULL,
  `disponible` varchar(60) NOT NULL,
  `precio` varchar(24) NOT NULL,
  `image` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id`, `nombre`, `descripcion`, `duracion`, `disponible`, `precio`, `image`) VALUES
(1, 'Tour por el Cañón del Atuel', 'El circuito comienza transitando la cuesta de los terneros, villa y pueblo El Nihuil, esperan 45 Km de camino consolidado que acompañan el incansable descenso de las aguas por el Cañón del Atuel.', '10:00', 'Todos los días', '5500', 'Atuel_b4p8sl'),
(2, 'Laberinto de Borges', 'El lugar cuenta con un Laberinto el cual le hace homenaje a Escritor Jorge Luis Borges, además de una torre con diferentes niveles donde se puede apreciar el lugar, una muestra histórica.', '03:30', 'Miércoles y Sábados', '3000', 'Laberinto-Borges_gwjmvk'),
(3, 'Dique de los Reyunos', 'El recorrido iniciará visitando una bodega tradicional; desde allí nos dirigiremos a las ruinas del Fuerte San Rafael del Diamante. Por último visitaremos el dique El Tigre, el cual trabaja junto al Dique Los Reyunos.', '05:00', 'De Lunes a Sábados', '3500', 'Dique-Reyunos_xskyf3'),
(4, 'Bike por los Viñedos', 'Visita a Bodegas Bianchi, bodega histórica que se remonta a la inmigración, donde Don Valentín Bianchi comienza un sueño que hoy continúa. Demostrando la calidad de sus reconocidos productos.', '06:00', 'De Lunes a Sábados', '4700', 'Bike_b0a1fl'),
(5, 'Rafting en San Rafael', 'Consiste en descender ríos de montaña, a través de su cauce en una embarcación de goma, propulsada por remos y acompañados por un guía. Existen diversos niveles de dificultad.', '02:00', 'Todos los Días', '4000', 'Rafting_wmwg4v');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `user` varchar(36) DEFAULT NULL,
  `email` varchar(66) DEFAULT NULL,
  `password` varchar(126) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`user`, `email`, `password`) VALUES
('fernando', 'fernando@mail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
('Marcelo', 'marcelo@mail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
('admin', 'admin@mail.com', '21232f297a57a5a743894a0e4a801fc3');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
