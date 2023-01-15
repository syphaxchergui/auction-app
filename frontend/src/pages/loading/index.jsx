import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";

const Loading = () => {
  return (
    <>
      <Skeleton variant="text" width={300} sx={{ mt: 2 }} />
      <Skeleton variant="text" width={200} sx={{ mt: 1, mb: 2 }} />
      <Grid container columnSpacing={4} rowSpacing={5}>
        <Grid item xs={12} md={12}>
          <Skeleton variant="rectangular" height={120} />
        </Grid>
      </Grid>

      <Skeleton variant="text" width={300} sx={{ mt: 3 }} />
      <Skeleton variant="text" width={200} sx={{ mt: 1, mb: 2 }} />
      <Grid container columnSpacing={4} rowSpacing={5}>
        <Grid item xs={6} md={6}>
          <Skeleton variant="rectangular" height={120} />
        </Grid>
        <Grid item xs={6} md={6}>
          <Skeleton variant="rectangular" height={120} />
        </Grid>
      </Grid>
    </>
  );
};

export default Loading;
