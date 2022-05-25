import { useCallback, useState } from "react";
import { Container, Menu } from "@atrilabs/core";
import {
  gray300,
  gray700,
  gray800,
  gray900,
  h1Heading,
  IconMenu,
} from "@atrilabs/design-system";
import { ReactComponent as Insert } from "./assets/insert.svg";
import { Cross } from "./assets/Cross";
import { useManifestRegistry } from "./hooks/useManifestRegistry";

const styles: { [key: string]: React.CSSProperties } = {
  iconContainer: {
    borderRight: `1px solid ${gray800}`,
  },
  dropContainerItem: {
    width: "15rem",
    height: `100%`,
    backgroundColor: gray700,
    boxSizing: "border-box",
  },
  // ===========header======================
  dropContainerItemHeader: {
    padding: `0.5rem 1rem`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-between`,
  },
  dropContainerItemHeaderH4: {
    ...h1Heading,
    color: gray300,
    margin: 0,
  },
  // =============header icons====================
  icons: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  iconsSpan: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    width: "1.3rem",
    height: "100% !important",
  },
  // ===============main layout=====================
  mainContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
  },
  compContainer: {
    border: `1px solid ${gray900}`,
    padding: "1rem 0",
  },
};

export default function () {
  const [showInsertPanel, setShowInsertPanel] = useState<boolean>(false);
  const onClick = useCallback(() => {
    setShowInsertPanel(true);
  }, []);
  const closeContainer = useCallback(() => {
    setShowInsertPanel(false);
  }, []);

  const components = useManifestRegistry();
  return (
    <>
      <Menu name="PageMenu">
        <div style={styles.iconContainer}>
          <IconMenu onClick={onClick} active={false}>
            <Insert />
          </IconMenu>
        </div>
      </Menu>
      {showInsertPanel ? (
        <Container name="Drop">
          <div style={styles.dropContainerItem}>
            <header style={styles.dropContainerItemHeader}>
              <h4 style={styles.dropContainerItemHeaderH4}>Insert Component</h4>
              <div style={styles.icons}>
                <span style={styles.iconsSpan} onClick={closeContainer}>
                  <Cross />
                </span>
              </div>
            </header>
            <div style={styles.mainContainer}>
              {components.map((comp, index) => {
                return (
                  <div style={styles.compContainer} key={comp.pkg + index}>
                    <comp.component.panel.icon
                      {...comp.component.panel.props}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      ) : null}
    </>
  );
}