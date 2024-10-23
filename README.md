<h3 align="center">Igrounding</h3>

## About the Project

The goal of the project is to design an easy to use desktop application for fault current analysis on overhead transmission lines, built on top of the OpenDSS system simulator. Initial scope is calculating and displaying grounding currents at transmission towers along transmission lines. This includes the following features:

-   A database of tower geometries and conductor types that is shared among all projects.
-   Custom .project files for each project, containing the necessary data for running a fault current analysis on a system.
-   Calculation of both current to ground and current along each conductor of a transmission line.
-   Diagrams of both the system and the results.

### Built With

-   [Electron](https://www.electronjs.org/)
-   [OpenDSS](https://www.epri.com/pages/sa/opendss)
-   [tRPC](https://trpc.io/)
-   [React.js](https://reactjs.org/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Drizzle ORM](https://orm.drizzle.team/)

## Screenshots

<div align="center">
  <img src="docs\project_diagram.png"  title="Project Diagram">
</div>
<div align="center">
  <img src="docs\tower_geometry_diagram.png"  title="Tower Geometry Diagram">
</div>
<div align="center">
  <img src="docs\transmission_line_results_diagram.png"  title="Transmission Line Results Diagram">
</div>
<div align="center">
  <img src="docs\worst_case_scenario.png"  title="Worst Case Scenario Diagram">
</div>
## Setup

#### Requirements

-   Windows 10 or 11
-   [OpenDSS](https://sourceforge.net/projects/electricdss/) (Version: >=10.x)

### Installation

You can find prebuilt installers for Igrounding on the [Github Releases](https://github.com/Michaelp1994/transmission-lines/releases/latest) page.

Alternatively, skip to the section below for instructions on how to build the project directly from source.

## Development

#### Prerequisites

-   Windows 10 or 11
-   [OpenDSS](https://sourceforge.net/projects/electricdss/) (Version: >=10.x)
-   [NodeJS](https://nodejs.org/en) (Version: >=22.x)
-   [Pnpm](https://pnpm.io/) (Version: >=9.x)
-   [Python](https://www.python.org/) (Version: >=3.10)
-   [Visual Studio 2022 C++ build tools](https://visualstudio.microsoft.com/downloads/)

Note: You can install the last four requirements using [chocolatey](https://chocolatey.org/).

```bash
choco install nodejs pnpm python visualstudio2022-workload-vctools -y
```

### Steps

1. Clone the repository

```bash
git clone https://github.com/Michaelp1994/transmission-lines.git
```

2. Install dependencies

```bash
pnpm install
```

3. Run the development script.

```bash
pnpm run dev
```

Any problems? Please open an issue on the [Github Issues](https://github.com/Michaelp1994/transmission-lines/issues) page.

## Contributing

If you would like to contribute to the project, there are many ways in which you can help:

If you're experiencing a bug or have a suggestion for how to improve, please open a [new issue](https://github.com/Michaelp1994/transmission-lines/issues).

If you're interested in contributing code, please submit a [pull request](https://github.com/Michaelp1994/transmission-lines/pulls).

## Contact

-   [LinkedIn](https://www.linkedin.com/in/michael-poulgrain/)
-   [Email](mailto:michael.poulgrain@gmail.com)
