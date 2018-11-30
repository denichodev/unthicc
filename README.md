# unthicc
A highly scalable URL shortener service, for learning purpose.

## TODOs
- [x] Remove all old deployment scripts
- [x] New deployment scripts with fabric
- [x] flexible fabric scripts to run with env var
- [x] flexible fabric scripts run without rebuild
- [ ] custom add known-host feature in `entrypoint.sh` for `deploy:1.2`
- [ ] Healthcheck for docker update, handling 502 when updating (check curl from nginx -> container)
