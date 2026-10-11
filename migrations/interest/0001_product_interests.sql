CREATE TABLE product_interests (
  receipt TEXT PRIMARY KEY,
  products TEXT NOT NULL,
  consent_version TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX product_interests_created ON product_interests(created_at);
CREATE TABLE interest_limits (
  key TEXT NOT NULL,
  window INTEGER NOT NULL,
  count INTEGER NOT NULL,
  PRIMARY KEY (key, window)
);
