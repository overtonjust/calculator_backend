
\c calc_dev;

INSERT INTO history_dates (time_recorded) VALUES
('2025-02-08')
ON CONFLICT (time_recorded) DO NOTHING;

INSERT INTO history_dates (time_recorded) VALUES
(CURRENT_DATE)
ON CONFLICT (time_recorded) DO NOTHING;

INSERT INTO history (time_recorded, calculation, history_date_id) VALUES
('2025-02-08', '2+2=4', 1),
('2025-02-08', '4*5=20', 1),
('2025-02-08', '10-3=7', 1);

INSERT INTO history (calculation, history_date_id) VALUES
('7*3=21', (SELECT id FROM history_dates WHERE time_recorded = CURRENT_DATE));