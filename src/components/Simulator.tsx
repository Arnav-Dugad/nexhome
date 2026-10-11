import { useState } from "react";
import {
  Home,
  Moon,
  Film,
  Sun,
  Leaf,
  DoorOpen,
  Lightbulb,
  Wind,
  ShieldCheck,
  Radio,
} from "lucide-react";
const scenes = [
  {
    name: "Arriving home",
    icon: Home,
    light: 72,
    temp: 24,
    status: "Welcome home",
    description:
      "A softer arrival. Entry lights rise and your living space settles into a comfortable rhythm.",
    steps: [
      "Sense detects a simulated arrival",
      "Core evaluates the local routine",
      "Light fades to a warm welcome",
    ],
  },
  {
    name: "Leaving home",
    icon: DoorOpen,
    light: 0,
    temp: 27,
    status: "Away mode",
    description:
      "A considered departure. Non-essential lights switch off and the home enters a quieter state.",
    steps: [
      "Control activates the leaving scene",
      "Light switches off",
      "Core pauses non-essential routines",
    ],
  },
  {
    name: "Movie night",
    icon: Film,
    light: 18,
    temp: 23,
    status: "Cinema scene",
    description:
      "Less glare, more atmosphere. The lighting softens while the room becomes ready for a film.",
    steps: [
      "Control selects movie night",
      "Light dims to 18%",
      "Core keeps selected devices in sync",
    ],
  },
  {
    name: "Morning",
    icon: Sun,
    light: 85,
    temp: 24,
    status: "Good morning",
    description:
      "Ease into the day with gradually brighter light and a gentle environmental check.",
    steps: [
      "Core starts a scheduled routine",
      "Light gradually increases",
      "Air checks simulated room conditions",
    ],
  },
  {
    name: "Energy saving",
    icon: Leaf,
    light: 35,
    temp: 26,
    status: "Low energy scene",
    description:
      "An example of reducing unnecessary device use. No measured energy saving is implied.",
    steps: [
      "Sense checks room occupancy",
      "Core reduces inactive device use",
      "Light adjusts to available daylight",
    ],
  },
  {
    name: "Night mode",
    icon: Moon,
    light: 6,
    temp: 23,
    status: "Rest easy",
    description:
      "A quieter home after dark. Gentle pathway lighting, with fewer distractions.",
    steps: [
      "Control selects night mode",
      "Light lowers to a gentle glow",
      "Core limits non-essential activity",
    ],
  },
];
export default function Simulator({ compact = false }: { compact?: boolean }) {
  const [scene, setScene] = useState(0);
  const [light, setLight] = useState(72);
  const [enabled, setEnabled] = useState(true);
  const current = scenes[scene];
  return (
    <div className={"simulator " + (compact ? "compact" : "")}>
      <div className="simulator-head">
        <span className="eyebrow">
          <span className="status-dot" />
          Profectus360 INTELLIGENCE
        </span>
        <span className="simulation-label">Interactive simulation</span>
      </div>
      <div className="simulator-body">
        <div
          className="scene-selector"
          role="group"
          aria-label="Choose simulated routine"
        >
          {scenes.map((s, i) => (
            <button
              key={s.name}
              aria-pressed={scene === i}
              onClick={() => {
                setScene(i);
                setLight(s.light);
                setEnabled(s.light > 0);
              }}
            >
              <s.icon size={18} />
              {s.name}
            </button>
          ))}
        </div>
        <div className="room-panel">
          <div
            className="room"
            style={
              {
                "--illumination": (enabled ? light : 0) / 100,
              } as React.CSSProperties
            }
          >
            <div className="room-window" />
            <div className="room-light" />
            <div className="room-sofa">
              <i />
              <i />
              <i />
            </div>
            <div className="room-table" />
            <div className="room-plant" />
            <span className="room-caption">LIVING ROOM / DESIGN STUDY</span>
          </div>
          <div className="room-status" aria-live="polite">
            <span>
              <span className="status-dot" />
              {current.status}
            </span>
            <span>{current.temp}°C · simulated</span>
          </div>
        </div>
        <div className="scene-controls">
          <h3>{current.name}</h3>
          <p>{current.description}</p>
          <div className="light-control">
            <label htmlFor={"brightness" + (compact ? "compact" : "full")}>
              <Lightbulb size={17} /> Ambient light{" "}
              <span>{enabled ? light : 0}%</span>
            </label>
            <input
              id={"brightness" + (compact ? "compact" : "full")}
              type="range"
              min="0"
              max="100"
              value={light}
              onChange={(e) => {
                setLight(Number(e.target.value));
                setEnabled(true);
              }}
            />
            <button
              className="power-button"
              onClick={() => setEnabled(!enabled)}
              aria-pressed={enabled}
            >
              Lighting {enabled ? "on" : "off"}
            </button>
          </div>
          <div className="sim-readings">
            <span>
              <Wind size={16} />
              Air: illustrative
            </span>
            <span>
              <ShieldCheck size={16} />
              Local routine concept
            </span>
            <span>
              <Radio size={16} />
              No hardware connected
            </span>
          </div>
        </div>
      </div>
      <div className="routine-flow" aria-live="polite">
        {current.steps.map((s, i) => (
          <div key={s}>
            <span>0{i + 1}</span>
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}
